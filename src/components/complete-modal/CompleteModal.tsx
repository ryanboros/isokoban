import { FC, useCallback } from "react";
import cn from "classnames";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { LEVELS } from "@/lib/game.constants";
import { LevelActions } from "@/store/level-actions";
import { getTheLevelInfo } from "@/store/level-slice";

interface ModalProps {
  open: boolean;
}

const CompleteModal = ({ open }: ModalProps): FC => {
  /**
   * STATE
   */
  const dispatch = useAppDispatch();

  const { currentLevel, moveCount } = useAppSelector((state) => state.level);
  const levelInfo = useAppSelector(getTheLevelInfo);

  /**
   * METHODS
   */
  const handleNextLevelClick = useCallback(() => {
    const nextLevel: number =
      currentLevel === LEVELS.length - 1 ? 0 : currentLevel + 1;

    dispatch(LevelActions.updateCurrentLevel(nextLevel));
  }, [currentLevel, dispatch]);

  /**
   * VARIABLES
   */
  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  });

  /**
   * RENDER
   */
  return (
    <div className={modalClass}>
      <div className="modal-box">
        <h3 className="text-center text-2xl mb-4">Puzzle Solved!</h3>
        <p>{levelInfo?.title || ""}</p>
        <p>Your Moves: {moveCount}</p>

        <div className="modal-action">
          <button
            className="btn btn-active btn-info text-white"
            onClick={handleNextLevelClick}
          >
            Play Next Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;
