import { FC } from "react";
import cn from "classnames";

interface ModalProps {
  open: boolean;
}

const CompleteModal = ({ open }: ModalProps): FC => {
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
        <h3 className="text-center text-2xl">Puzzle Solved!</h3>

        <div className="modal-action">
          <button
            className="btn btn-active btn-info text-white"
            onClick={() => console.log("load next level, reset stats")}
          >
            Play Next Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;
