import { FC } from "react";
import cn from "classnames";
import { uniqueId } from "lodash";
import { BoxFill } from "react-bootstrap-icons";

import { useAppSelector } from "@/hooks/redux-hooks";
import { BlockModel } from "@/lib/game.model";
import { getTheBlocks } from "@/store/level-slice";

const GameControls = (): FC => {
  /**
   * STATE
   */
  const { moveCount } = useAppSelector((state) => state.level);
  const blocks = useAppSelector(getTheBlocks);

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
            "text-blue-200": !block.isComplete,
            "text-green-400": block.isComplete,
          });

          return (
            <BoxFill className={boxClass} key={uniqueId("box")} size={32} />
          );
        })}
      </div>
    </div>
  );
};

export default GameControls;
