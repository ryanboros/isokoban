import { AnyAction, ThunkAction } from "@reduxjs/toolkit";

import { RootState } from ".";
import LevelSlice from "./level-slice";
import { LevelModel } from "@/lib/game.model";
import LevelService from "@/service/level-service";

export const LevelActions = LevelSlice.actions;

export const fetchLevel = (
  name: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response: LevelModel = await LevelService.getLevel(name);
    dispatch(LevelActions.setLevel(response));
  };
};
