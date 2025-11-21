import { isNil, size, times, uniqueId } from "lodash";

import {
  BlockModel,
  Coordinates,
  GameObjectsType,
  MoveType,
  PlayerModel,
  Point,
  TileModel,
} from ".game.model";
import { BLOCK, PLAYER, TILE, TILE_H, TILE_W } from "./game.constants";

export const sortByDepth = (a: GameObjectsType, b: GameObjectsType) =>
  a.depth - b.depth;

export const getTileDepth = (coord: Coordinates) =>
  coord.row * TILE_H + coord.col * TILE_W + coord.row;

export const checkSlot = (coord: Coordinates, slots: Coordinates[]) =>
  slots.some((slot) => slot.row === coord.row && slot.col === coord.col);

export const getPos = (coord: Coordinates, origin: Point): Point => {
  return {
    x: origin.x + ((coord.col - coord.row) * TILE_W) / 2,
    y: origin.y + ((coord.row + coord.col) * TILE_H) / 2,
  };
};

export const getOrigin = (
  map: number[][],
  width: number,
  height: number
): Point => {
  const rows = size(map);
  const cols = size(map[0]);

  // center point of stage
  const cX = width / 2;
  const cY = height / 2;

  // returns point of first tile to allow the whole map to be centered on stage
  return {
    x: cX + ((rows - cols) / 4) * TILE_W,
    y: cY - ((cols + rows) / 6) * TILE_H,
  };
};

export const getTiles = (
  map: number[][],
  slots: Coordinates[],
  origin: Point
): TileModel[] => {
  const rows = size(map);
  const cols = size(map[0]);

  const tiles: TileModel[] = [];

  times(rows, (r) => {
    times(cols, (c) => {
      const coord: Coordinates = { row: r, col: c };

      tiles.push({
        coord: coord,
        depth: getTileDepth(coord),
        id: uniqueId("tile"),
        isSlot: checkSlot(coord, slots),
        isWall: map[r][c] === 1,
        pos: getPos(coord, origin),
        type: TILE,
      });
    });
  });

  return tiles;
};

export const getBlocks = (
  blocks: Coordinates[],
  slots: Coordinates[],
  origin: Point
): BlockModel[] =>
  blocks.map((coord) => {
    return {
      coord: coord,
      depth: getTileDepth(coord) + 5,
      id: uniqueId("block"),
      isComplete: checkSlot(coord, slots),
      pos: getPos(coord, origin),
      type: BLOCK,
    };
  });

export const getPlayer = (coord: Coordinates, origin: Point): PlayerModel => {
  return {
    coord: coord,
    depth: getTileDepth(coord) + 5,
    id: uniqueId("player"),
    pos: getPos(coord, origin),
    type: PLAYER,
  };
};

export const getNextTile = (
  move: MoveType,
  distance: number,
  player: PlayerModel,
  tiles: GameObjectsType[]
) => {
  let { row, col } = player.coord;

  switch (move) {
    case "up":
      col = col - distance;
      break;
    case "down":
      col = col + distance;
      break;
    case "left":
      row = row + distance;
      break;
    case "right":
      row = row - distance;
      break;
    default:
      break;
  }

  return tiles?.find(
    (tile) => tile.coord.row === row && tile.coord.col === col
  ) as TileModel;
};

export const hasBlock = (tile: TileModel, blocks: BlockModel[]) =>
  !isNil(
    blocks.find(
      (block) =>
        block.coord.row === tile.coord.row && block.coord.col === tile.coord.col
    )
  );

export const getBlock = (tile: TileModel, blocks: BlockModel[]) =>
  blocks.find(
    (block) =>
      block.coord.row === tile.coord.row && block.coord.col === tile.coord.col
  );
