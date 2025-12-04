import {
  createSelector,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from ".";
import { BLOCK, PLAYER, TILE } from "@/lib/game.constants";
import {
  BlockModel,
  Dimensions,
  GameObjectsType,
  LevelModel,
  PlayerModel,
  Point,
  TileModel,
} from "@/lib/game.model";
import {
  createBlocks,
  createPlayer,
  createTiles,
  getOrigin,
  sortByDepth,
} from "@/lib/game.utils";
import { LEVELS } from "../lib/game.constants";

interface LevelProps {
  gameObjects: GameObjectsType[] | null;
  isLevelComplete: boolean;
  level: LevelModel | null;
  moveCount: number;
}

const initialState: LevelProps = {
  currentLevel: 0,
  gameObjects: null,
  isLevelComplete: false,
  level: null,
  moveCount: 0,
};

export const LevelSlice = createSlice({
  name: "level",
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<LevelModel>) => {
      state.level = action.payload;
    },
    updateCurrentLevel: (state, action: PayloadAction<number>) => {
      state.currentLevel = action.payload;
      state.level = null;
      state.gameObjects = null;
      state.isLevelComplete = false;
      state.moveCount = 0;
    },
    buildLevel: (state, action: PayloadAction<Dimensions>) => {
      const level: LevelModel = current(state).level as LevelModel;
      const { height, width } = action.payload;

      const origin: Point = getOrigin(level.map, width, height);

      const tileObjs: TileModel[] = createTiles(level.map, level.slots, origin);

      const blockObjs: BlockModel[] = createBlocks(
        level.blocks,
        level.slots,
        origin
      );

      const playerObj: PlayerModel = createPlayer(level.player, origin);

      state.gameObjects = [...tileObjs, ...blockObjs, playerObj].sort(
        sortByDepth
      );
      state.moveCount = 0;
      state.isLevelComplete = false;
    },
    movePlayer: (state, action: PayloadAction<TileModel>) => {
      const gameObjects: GameObjectsType[] = current(state)
        .gameObjects as GameObjectsType[];

      const idx: number = gameObjects?.findIndex(
        (obj) => obj.type === "player"
      );

      const updateGameObjects: GameObjectsType[] = [
        ...gameObjects.slice(0, idx),
        {
          ...gameObjects[idx],
          pos: action.payload.pos,
          coord: action.payload.coord,
          depth: action.payload.depth + 5,
        },
        ...gameObjects.slice(idx + 1),
      ];

      state.gameObjects = updateGameObjects.sort(sortByDepth);
      state.moveCount++;
    },
    moveBlock: (
      state,
      action: PayloadAction<{ tile: TileModel; block: BlockModel | undefined }>
    ) => {
      const gameObjects: GameObjectsType[] = current(state)
        .gameObjects as GameObjectsType[];

      const idx: number = gameObjects.findIndex(
        (obj) => obj.type === "block" && obj.id === action.payload.block?.id
      );

      const updateGameObjects: GameObjectsType[] = [
        ...gameObjects.slice(0, idx),
        {
          ...gameObjects[idx],
          pos: action.payload.tile.pos,
          coord: action.payload.tile.coord,
          depth: action.payload.tile.depth + 5,
          isComplete: action.payload.tile.isSlot,
        },
        ...gameObjects.slice(idx + 1),
      ];

      state.isLevelComplete = updateGameObjects
        .filter((obj) => obj.type === BLOCK)
        .every((obj: BlockModel) => obj.isComplete);

      state.gameObjects = updateGameObjects.sort(sortByDepth);
    },
  },
});

export const getTheBlocks = createSelector(
  (state: RootState) => state?.level?.gameObjects,
  (gameObjects) => gameObjects?.filter((obj) => obj.type === BLOCK)
);

export const getThePlayer = createSelector(
  (state: RootState) => state?.level?.gameObjects,
  (gameObjects) => gameObjects?.filter((obj) => obj.type === PLAYER)[0]
);

export const getTheTiles = createSelector(
  (state: RootState) => state?.level?.gameObjects,
  (gameObjects) => gameObjects?.filter((obj) => obj.type === TILE)
);

export const getTheLevelInfo = createSelector(
  (state: RootState) => state?.level?.currentLevel,
  (currentLevel) => LEVELS[currentLevel]
);

export default LevelSlice;
