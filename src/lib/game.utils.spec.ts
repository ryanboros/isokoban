import { BLOCK, DOWN, LEFT, PLAYER, TILE, UP } from "./game.constants";
import {
  checkSlot,
  createBlocks,
  createPlayer,
  createTiles,
  getBlock,
  getNextTile,
  getOrigin,
  getPos,
  getTileDepth,
  hasBlock,
  sortByDepth,
} from "./game.utils";

const fixtures = {
  map: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  player: { row: 1, col: 1 },
  blocks: [{ row: 1, col: 2 }],
  slots: [{ row: 1, col: 3 }],
  origin: { x: 0, y: 0 },
  tileCoord: { row: 1, col: 2 },
  blockObjs: [{ coord: { row: 1, col: 2 } }],
  tileObj: { coord: { row: 1, col: 2 } },
  gameObjs: [
    {
      depth: 120,
    },
    {
      depth: 60,
    },
    {
      depth: 0,
    },
  ],

  tileObjs: [
    {
      coord: { col: 0, row: 0 },
    },
    {
      coord: { col: 1, row: 0 },
    },
    {
      coord: { col: 2, row: 0 },
    },
    {
      coord: { col: 0, row: 1 },
    },
    {
      coord: { col: 1, row: 1 },
    },
    {
      coord: { col: 2, row: 1 },
    },
    {
      coord: { col: 0, row: 2 },
    },
    {
      coord: { col: 1, row: 2 },
    },
    {
      coord: { col: 2, row: 2 },
    },
  ],
  playerObj: { coord: { row: 1, col: 1 } },
};

describe("game.utils tests", () => {
  it("should determine if tile is a slot", () => {
    let isSlot = checkSlot(fixtures.tileCoord, fixtures.slots);

    expect(isSlot).not.toBeTruthy();

    isSlot = checkSlot(fixtures.slots[0], fixtures.slots);

    expect(isSlot).toBeTruthy();
  });

  it("should get the block objects", () => {
    const blocks = createBlocks(
      fixtures.blocks,
      fixtures.slots,
      fixtures.origin
    );

    expect(blocks.length).toEqual(1);
    expect(blocks).toEqual([
      {
        coord: { col: 2, row: 1 },
        depth: 160,
        id: "block1",
        isComplete: false,
        pos: { x: 30, y: 51 },
        type: BLOCK,
      },
    ]);
  });

  it("should get the player object", () => {
    const player = createPlayer(fixtures.player, fixtures.origin);

    expect(player).toEqual({
      coord: { col: 1, row: 1 },
      depth: 100,
      id: "player2",
      pos: { x: 0, y: 34 },
      type: PLAYER,
    });
  });

  it("should get all tile objects", () => {
    const tiles = createTiles(fixtures.map, fixtures.slots, fixtures.origin);

    expect(tiles.length).toEqual(15);
    expect(tiles).toEqual([
      {
        coord: { col: 0, row: 0 },
        depth: 0,
        id: "tile3",
        isSlot: false,
        isWall: true,
        pos: { x: 0, y: 0 },
        type: TILE,
      },
      {
        coord: { col: 1, row: 0 },
        depth: 60,
        id: "tile4",
        isSlot: false,
        isWall: true,
        pos: { x: 30, y: 17 },
        type: TILE,
      },
      {
        coord: { col: 2, row: 0 },
        depth: 120,
        id: "tile5",
        isSlot: false,
        isWall: true,
        pos: { x: 60, y: 34 },
        type: TILE,
      },
      {
        coord: { col: 3, row: 0 },
        depth: 180,
        id: "tile6",
        isSlot: false,
        isWall: true,
        pos: { x: 90, y: 51 },
        type: TILE,
      },
      {
        coord: { col: 4, row: 0 },
        depth: 240,
        id: "tile7",
        isSlot: false,
        isWall: true,
        pos: { x: 120, y: 68 },
        type: TILE,
      },
      {
        coord: { col: 0, row: 1 },
        depth: 35,
        id: "tile8",
        isSlot: false,
        isWall: true,
        pos: { x: -30, y: 17 },
        type: TILE,
      },
      {
        coord: { col: 1, row: 1 },
        depth: 95,
        id: "tile9",
        isSlot: false,
        isWall: false,
        pos: { x: 0, y: 34 },
        type: TILE,
      },
      {
        coord: { col: 2, row: 1 },
        depth: 155,
        id: "tile10",
        isSlot: false,
        isWall: false,
        pos: { x: 30, y: 51 },
        type: TILE,
      },
      {
        coord: { col: 3, row: 1 },
        depth: 215,
        id: "tile11",
        isSlot: true,
        isWall: false,
        pos: { x: 60, y: 68 },
        type: TILE,
      },
      {
        coord: { col: 4, row: 1 },
        depth: 275,
        id: "tile12",
        isSlot: false,
        isWall: true,
        pos: { x: 90, y: 85 },
        type: TILE,
      },
      {
        coord: { col: 0, row: 2 },
        depth: 70,
        id: "tile13",
        isSlot: false,
        isWall: true,
        pos: { x: -60, y: 34 },
        type: TILE,
      },
      {
        coord: { col: 1, row: 2 },
        depth: 130,
        id: "tile14",
        isSlot: false,
        isWall: true,
        pos: { x: -30, y: 51 },
        type: TILE,
      },
      {
        coord: { col: 2, row: 2 },
        depth: 190,
        id: "tile15",
        isSlot: false,
        isWall: true,
        pos: { x: 0, y: 68 },
        type: TILE,
      },
      {
        coord: { col: 3, row: 2 },
        depth: 250,
        id: "tile16",
        isSlot: false,
        isWall: true,
        pos: { x: 30, y: 85 },
        type: TILE,
      },
      {
        coord: { col: 4, row: 2 },
        depth: 310,
        id: "tile17",
        isSlot: false,
        isWall: true,
        pos: { x: 60, y: 102 },
        type: TILE,
      },
    ]);
  });

  it("should get the block object that is on a tile", () => {
    const block = getBlock(fixtures.tileObj, fixtures.blockObjs);

    expect(block).toEqual({ coord: { row: 1, col: 2 } });
  });

  it("should calculate the next tile the player could move to based on move direction", () => {
    const upTile = getNextTile(UP, 1, fixtures.playerObj, fixtures.tileObjs);

    expect(upTile).toEqual({
      coord: { col: 0, row: 1 },
    });

    const downTile = getNextTile(
      DOWN,
      1,
      fixtures.playerObj,
      fixtures.tileObjs
    );

    expect(downTile).toEqual({
      coord: { col: 2, row: 1 },
    });

    const leftTile = getNextTile(
      LEFT,
      1,
      fixtures.playerObj,
      fixtures.tileObjs
    );

    expect(leftTile).toEqual({
      coord: { col: 1, row: 2 },
    });

    const rightTile = getNextTile(UP, 1, fixtures.playerObj, fixtures.tileObjs);

    expect(rightTile).toEqual({
      coord: { col: 0, row: 1 },
    });
  });

  it("should calculate the origin point of first tile to center a map within an area", () => {
    const origin = getOrigin(fixtures.map, 0, 0);

    expect(origin).toEqual({ x: -30, y: -45.33333333333333 });
  });

  it("should calculate tile depth", () => {
    const tileDepth = getTileDepth(fixtures.tileCoord);

    expect(tileDepth).toEqual(155);
  });

  it("should determine that a tile has a block", () => {
    const isBlock = hasBlock(fixtures.tileObj, fixtures.blockObjs);

    expect(isBlock).toBeTruthy();
  });

  it("should determine that a tile does not have a block", () => {
    const isBlock = hasBlock(fixtures.tileObj, []);

    expect(isBlock).not.toBeTruthy();
  });

  it("should calculate object position from coordinates and origin point", () => {
    const pos = getPos(fixtures.tileCoord, fixtures.origin);

    expect(pos).toEqual({ x: 30, y: 51 });
  });

  it("should sort gameObjects by depth", () => {
    const sorted = fixtures.gameObjs.sort(sortByDepth);

    expect(sorted).toEqual([
      {
        depth: 0,
      },
      {
        depth: 60,
      },
      {
        depth: 120,
      },
    ]);
  });
});
