import { AnyAction, ThunkAction } from "@reduxjs/toolkit";

import { RootState } from ".";
import LevelSlice from "./level-slice";
import LevelService from "@/service/level-service";
import {
  // BlockModel,
  // GameObjectsType,
  LevelModel,
  // MoveType,
  // PlayerModel,
} from "@/lib/game.model";
// import { getBlock, getNextTile, hasBlock } from "@/lib/game.utils";

export const LevelActions = LevelSlice.actions;

export const fetchLevel = (
  name: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response: LevelModel = await LevelService.getLevel(name);
    dispatch(LevelActions.setLevel(response));
  };
};

// export const eventHandler = (
//   move: MoveType,
//   blocks: BlockModel[],
//   player: PlayerModel,
//   tiles: GameObjectsType[]
// ): ThunkAction<void, RootState, unknown, AnyAction> => {
//   return async (dispatch, getState) => {
//     const nextTile = getNextTile(move, 1, player, tiles);

//     // make sure next tile is not a wall
//     if (!nextTile.isWall) {
//       // check if next tile has a block
//       if (hasBlock(nextTile, blocks)) {
//         // tile has block
//         const lookAheadTile = getNextTile(move, 2, player, tiles);
//         const moveBlock = getBlock(nextTile, blocks);

//         // check if tile behind the block is a wall or also has a block
//         if (!lookAheadTile.isWall && !hasBlock(lookAheadTile, blocks)) {
//           // block is moveable, move block
//           dispatch(
//             LevelActions.moveBlock({ tile: lookAheadTile, block: moveBlock })
//           );

//           // move player to space vacated by block
//           dispatch(LevelActions.movePlayer(nextTile));
//         }
//       } else {
//         // open tile, move player
//         dispatch(LevelActions.movePlayer(nextTile));
//       }
//     }
//   };
// };
