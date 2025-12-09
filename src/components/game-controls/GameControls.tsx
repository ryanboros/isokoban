import { FC, useCallback } from "react";
import { ArrowClockwise, Grid3x3GapFill } from "react-bootstrap-icons";

import { useAppSelector, useAppDispatch } from "@/hooks/redux-hooks";
import { CANVAS_SIZE } from "@/lib/game.constants";
import { LevelActions } from "@/store/level-actions";
import { getTheLevelInfo } from "@/store/level-slice";

interface GameControlsProps {
  onOpen: () => void;
}
const GameControls = ({ onOpen }: GameControlsProps): FC => {
  /**
   * STATE
   */
  const dispatch = useAppDispatch();

  const levelInfo = useAppSelector(getTheLevelInfo);

  /**
   * METHODS
   */
  const handleResetClick = useCallback(() => {
    dispatch(LevelActions.buildLevel(CANVAS_SIZE));
  }, [dispatch]);

  /**
   * RENDER
   */
  return (
    <div className="text-center my-4 mx-4 flex flex-row justify-between items-center">
      <button className="btn btn-active btn-info text-white" onClick={onOpen}>
        <Grid3x3GapFill size={22} />
      </button>
      <div>
        <h3 className="text-xl">{levelInfo?.title || ""}</h3>
      </div>
      <button
        className="btn btn-active btn-info text-white"
        onClick={handleResetClick}
      >
        <ArrowClockwise size={22} />
      </button>
    </div>
  );
};

export default GameControls;
