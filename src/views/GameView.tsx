import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";

import Block from "@/components/block/Block";
import CompleteModal from "@/components/complete-modal/CompleteModal";
import GameControls from "@/components/game-controls/GameControls";
import GameFooter from "@/components/game-footer/GameFooter";
import LevelSelectModal from "@/components/level-select-modal/LevelSelectModal";
import Player from "@/components/player/Player";
import Tile from "@/components/tile/Tile";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  CANVAS_SIZE,
  DOWN,
  BLOCK,
  LEFT,
  LEVELS,
  PLAYER,
  RIGHT,
  UP,
} from "@/lib/game.constants";
import { getBlock, getNextTile, hasBlock } from "@/lib/game.utils";
import { GameObjectsType, MoveType } from "@/lib/game.model";
import { fetchLevel, LevelActions } from "@/store/level-actions";
import { getTheBlocks, getThePlayer, getTheTiles } from "@/store/level-slice";

const GameView: FC = () => {
  /**
   * STATE
   */
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLevelSelect, setShowLevelSelect] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { currentLevel, gameObjects, isLevelComplete, level } = useAppSelector(
    (state) => state.level
  );
  const blocks = useAppSelector(getTheBlocks) as BlockModel[];
  const player = useAppSelector(getThePlayer) as PlayerModel;
  const tiles = useAppSelector(getTheTiles) as TileModel[];

  /**
   * EFFECTS
   */
  useEffect(() => {
    if (level == null) {
      dispatch(fetchLevel(LEVELS[currentLevel].data));
    } else {
      if (gameObjects == null) {
        dispatch(LevelActions.buildLevel(CANVAS_SIZE));
      }
    }
  }, [currentLevel, dispatch, gameObjects, level]);

  /**
   * METHODS
   */
  const eventHandler = useCallback(
    (move: MoveType) => {
      const nextTile = getNextTile(move, 1, player, tiles);

      // make sure next tile is not a wall
      if (!nextTile.isWall) {
        // check if next tile has a block
        if (hasBlock(nextTile, blocks)) {
          // tile has block
          const lookAheadTile = getNextTile(move, 2, player, tiles);
          const moveBlock = getBlock(nextTile, blocks);

          // check if tile behind the block is a wall or also has a block
          if (!lookAheadTile.isWall && !hasBlock(lookAheadTile, blocks)) {
            // block is moveable, move block
            dispatch(
              LevelActions.moveBlock({ tile: lookAheadTile, block: moveBlock })
            );

            // move player to space vacated by block
            dispatch(LevelActions.movePlayer(nextTile));
          }
        } else {
          // open tile, move player
          dispatch(LevelActions.movePlayer(nextTile));
        }
      }
    },
    [dispatch, blocks, player, tiles]
  );

  const handleKeyPress = useCallback(
    (evt: KeyboardEvent<HTMLDivElement>) => {
      evt.preventDefault();

      if (!isLevelComplete) {
        switch (evt.key) {
          case "ArrowLeft":
            // LEFT
            eventHandler(LEFT);
            break;
          case "ArrowUp":
            // UP
            eventHandler(UP);
            break;
          case "ArrowRight":
            // RIGHT
            eventHandler(RIGHT);
            break;
          case "ArrowDown":
            // DOWN
            eventHandler(DOWN);
            break;
          default:
            break;
        }
      }
    },
    [eventHandler, isLevelComplete]
  );

  const handleShowLevelSelect = () => {
    setShowLevelSelect(true);
  };

  const handleHideLevelSelect = () => {
    setShowLevelSelect(false);
  };

  /**
   * RENDER
   */
  return (
    <>
      <div
        className="w-[640px] height-[480px] bg-white rounded-xl"
        ref={containerRef}
        tabIndex={-1}
        onKeyDown={handleKeyPress}
      >
        <GameControls onOpen={handleShowLevelSelect} />
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
        <GameFooter />
      </div>
      <CompleteModal open={isLevelComplete} />
      <LevelSelectModal
        open={showLevelSelect}
        onClose={handleHideLevelSelect}
      />
    </>
  );
};

export default GameView;
