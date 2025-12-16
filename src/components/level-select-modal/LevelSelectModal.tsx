import { FC, useCallback } from "react";
import cn from "classnames";
import { uniqueId } from "lodash";

import { LEVELS } from "@/lib/level.constants";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { LevelActions } from "@/store/level-actions";

interface ModalProps {
  onClose: () => void;
  open: boolean;
}

const LevelSelectModal = ({ onClose, open }: ModalProps): FC => {
  /**
   * STATE
   */

  const dispatch = useAppDispatch();

  /**
   * METHODS
   */
  const handleLevelClick = useCallback(
    (level: number) => {
      dispatch(LevelActions.updateCurrentLevel(level));
      onClose();
    },
    [dispatch, onClose]
  );

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
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="text-center text-2xl mb-4">Select Level</h3>
        <div className="grid grid-cols-5 gap-4">
          {LEVELS.map((lvl, idx) => (
            <button
              key={uniqueId("lvl")}
              className="btn btn-active btn-info text-white"
              onClick={() => handleLevelClick(idx)}
            >
              {lvl.shortTitle}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelectModal;
