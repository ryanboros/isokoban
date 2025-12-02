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
  getBlocks,
  getOrigin,
  getPlayer,
  getTiles,
  sortByDepth,
} from "@/lib/game.utils";

interface LevelProps {
  level: LevelModel | null;
  gameObjects: GameObjectsType[] | null;
  isLevelComplete: boolean;
  moveCount: number;
}

const initialState: LevelProps = {
  level: null,
  gameObjects: null,
  isLevelComplete: false,
  moveCount: 0,
};

export const LevelSlice = createSlice({
  name: "level",
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<LevelModel>) => {
      state.level = action.payload;
    },
    buildLevel: (state, action: PayloadAction<Dimensions>) => {
      const level: LevelModel = current(state).level as LevelModel;
      const { height, width } = action.payload;

      const origin: Point = getOrigin(level.map, width, height);

      const tileObjs: TileModel[] = getTiles(level.map, level.slots, origin);

      const blockObjs: BlockModel[] = getBlocks(
        level.blocks,
        level.slots,
        origin
      );

      const playerObj: PlayerModel = getPlayer(level.player, origin);

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

export const getThePlayer = createSelector(
  (state: RootState) => state?.level?.gameObjects,
  (gameObjects) => gameObjects?.filter((obj) => obj.type === PLAYER)[0]
);

export const getTheTiles = createSelector(
  (state: RootState) => state?.level?.gameObjects,
  (gameObjects) => gameObjects?.filter((obj) => obj.type === TILE)
);

export const getTheBlocks = createSelector(
  (state: RootState) => state?.level?.gameObjects,
  (gameObjects) => gameObjects?.filter((obj) => obj.type === BLOCK)
);

export default LevelSlice;
