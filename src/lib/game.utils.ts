import { isNil, size, times, uniqueId } from "lodash";

import { BLOCK, PLAYER, TILE, TILE_H, TILE_W } from "./game.constants";
import {
  BlockModel,
  Coordinates,
  GameObjectsType,
  MoveType,
  PlayerModel,
  Point,
  TileModel,
} from "./game.model";

/**
 * checkSlot - checks if coordinate contains a slot
 * @param coord : Coordinates
 * @param slots : Coordinates[]
 * @returns bool
 */
export const checkSlot = (coord: Coordinates, slots: Coordinates[]): boolean =>
  slots.some((slot) => slot.row === coord.row && slot.col === coord.col);

/**
 * createBlocks - creates block objects
 * @param blocks : Coordinates[]
 * @param slots : Coordinates[]
 * @param origin : Point
 * @returns BlockModel[]
 */
export const createBlocks = (
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

/**
 * createPlayer - creates player object
 * @param coord : Coordinates
 * @param origin : Point
 * @returns PlayerModel
 */
export const createPlayer = (
  coord: Coordinates,
  origin: Point
): PlayerModel => {
  return {
    coord: coord,
    depth: getTileDepth(coord) + 5,
    id: uniqueId("player"),
    pos: getPos(coord, origin),
    type: PLAYER,
  };
};

/**
 * createTiles - creates tiles objects from a 2d map
 * @param map : number[][]
 * @param slots : Coordinates[]
 * @param origin : Point
 * @returns TileModel[]
 */
export const createTiles = (
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

/**
 * getOrigin - calculates orgin point of a 2d map with a container
 *   with a give width and height
 * @param map : number[][]
 * @param width : number
 * @param height : number
 * @returns Point
 */
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

/**
 * getBlock - returns block that is on a tile
 * @param tile : TileModel
 * @param blocks : BlockModel[]
 * @returns BlockModel[]
 */
export const getBlock = (tile: TileModel, blocks: BlockModel[]): BlockModel[] =>
  blocks.find(
    (block) =>
      block.coord.row === tile.coord.row && block.coord.col === tile.coord.col
  );

/**
 * getNextTile - gets the tile that the player is trying to move to
 * @param move : MoveType
 * @param distance : number
 * @param player : PlayerModel
 * @param tiles : GameObjectsType[]
 * @returns TileModel
 */
export const getNextTile = (
  move: MoveType,
  distance: number,
  player: PlayerModel,
  tiles: GameObjectsType[]
): TileModel => {
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

/**
 * getPos - gets x & y Point based on coordinates and origin
 * @param coord : Coordinates
 * @param origin : Point
 * @returns Point
 */
export const getPos = (coord: Coordinates, origin: Point): Point => {
  return {
    x: origin.x + ((coord.col - coord.row) * TILE_W) / 2,
    y: origin.y + ((coord.row + coord.col) * TILE_H) / 2,
  };
};

/**
 * getTileDepth - gets the isometric tileDepth value of the a given coordinate
 * @param coord : Coordinates
 * @returns number
 */
export const getTileDepth = (coord: Coordinates): number =>
  coord.row * TILE_H + coord.col * TILE_W + coord.row;

/**
 * hasBlock - returns true if a block exists on the tile, false if there is no block
 * @param tile : TileModel
 * @param blocks : BlockModel[]
 * @returns boolean
 */
export const hasBlock = (tile: TileModel, blocks: BlockModel[]): boolean =>
  !isNil(
    blocks.find(
      (block) =>
        block.coord.row === tile.coord.row && block.coord.col === tile.coord.col
    )
  );

/**
 * sortByDepth - sort function that orders the game objects by depth, smallest to largest
 * @param a
 * @param b
 * @returns
 */
export const sortByDepth = (a: GameObjectsType, b: GameObjectsType) =>
  a.depth - b.depth;
