import { FC, useEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";

import Block from "@/components/block/Block";
import Player from "@/components/player/Player";
import Tile from "@/components/tile/Tile";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { BLOCK, PLAYER } from "@/lib/game.constants";
import { GameObjectsType } from "@/lib/game.model";
import { fetchLevel, LevelActions } from "@/store/level-actions";

const GameView: FC = () => {
  /**
   * STATE
   */
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const { gameObjects, level } = useAppSelector((state) => state.level);

  /**
   * EFFECTS
   */
  useEffect(() => {
    if (level == null) {
      dispatch(fetchLevel("microban001"));
    } else {
      if (gameObjects == null) {
        dispatch(
          LevelActions.buildLevel({
            height: 480,
            width: 640,
          })
        );
      }
    }
  }, [dispatch, gameObjects, level]);

  /**
   * RENDER
   */
  return (
    <div
      className="w-[640px] height-[640px] bg-white rounded-xl"
      ref={containerRef}
      tabIndex={-1}
    >
      <Stage height={480} width={640}>
        <Layer>
          {gameObjects?.map((obj: GameObjectsType) => {
            if (obj.type === BLOCK) {
              return (
                <Block key={obj.id} complete={obj.isComplete} {...obj.pos} />
              );
            }

            if (obj.type === PLAYER) {
              return <Player key={obj.id} {...obj.pos} />;
            }

            return (
              <Tile
                key={obj.id}
                slot={obj.isSlot}
                wall={obj.isWall}
                {...obj.pos}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default GameView;
