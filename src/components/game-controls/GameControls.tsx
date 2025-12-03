import { FC, useCallback } from "react";
import cn from "classnames";
import { ArrowClockwise, Box } from "react-bootstrap-icons";

import { useAppSelector, useAppDispatch } from "@/hooks/redux-hooks";
import { BlockModel } from "@/lib/game.model";
import { LevelActions } from "@/store/level-actions";
import { getTheBlocks } from "@/store/level-slice";
import { uniqueId } from "lodash";

const GameControls = (): FC => {
  /**
   * STATE
   */
  const dispatch = useAppDispatch();

  const { moveCount } = useAppSelector((state) => state.level);
  const blocks = useAppSelector(getTheBlocks);

  /**
   * METHODS
   */

  const handleResetClick = useCallback(() => {
    dispatch(LevelActions.buildLevel({ height: 480, width: 640 }));
  }, [dispatch]);

  /**
   * RENDER
   */
  return (
    <div className="text-center my-4 mx-4 flex flex-row justify-between items-center">
      <div className="text-xl">Moves: {moveCount}</div>
      <div className="flex flex-row">
        {blocks?.map((block: BlockModel) => {
          const boxClass: string = cn({
            "mx-1": true,
            "text-blue-500": !block.isComplete,
            "text-green-500": block.isComplete,
          });

          return <Box className={boxClass} id={uniqueId("box")} size={32} />;
        })}
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
