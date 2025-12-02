import { TILE, BLOCK, PLAYER, UP, DOWN, LEFT, RIGHT } from "./game.constants";

export type ObjectType = typeof TILE | typeof BLOCK | typeof PLAYER;
export type MoveType = typeof UP | typeof DOWN | typeof LEFT | typeof RIGHT;

export interface Coordinates {
  row: number;
  col: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface LevelModel {
  player: Coordinates;
  blocks: Array<Coordinates>;
  slots: Array<Coordinates>;
  map: number[][];
}

export interface Point {
  x: number;
  y: number;
}

export interface BlockModel {
  coord: Coordinates;
  depth: number;
  id: string;
  isComplete: boolean;
  pos: Point;
  type: ObjectType;
}

export interface PlayerModel {
  coord: Coordinates;
  depth: number;
  id: string;
  pos: Point;
  type: ObjectType;
}

export interface TileModel {
  coord: Coordinates;
  depth: number;
  id: string;
  isSlot: boolean;
  isWall: boolean;
  pos: Point;
  type: ObjectType;
}

export type GameObjectsType = BlockModel | PlayerModel | TileModel;
