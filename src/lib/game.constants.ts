import { Dimensions, Level } from "./game.model";

export const COLORS = {
  // blues
  AZURE: "#0099FF",
  BLUE_RIBBON: "#0066FF",
  ROYAL_BLUE: "#2F55EF",
  BUBBLES: "#E9FDFF", //"#E2FBFF"
  ANAKIWA: "#A1DCFF", //"#84D0FF"
  GEYSER: "#D6DEE1",
  MALIBU: "#55BDFF",
  // reds
  RED: "#FF0000",
  TANGERINE: "#FF9878",
  // greys
  DUSTY_GREY: "#999999",
  MINE_SHAFT: "#333333",
  SILVER: "#CCCCCC",
  // greens
  GREEN: "#00FF00",
  SPRING_GREEN: "#00FF66",
  JAPANESE_LAUREL: "#008000",
};

export const GRADIENTS = {
  gradient1: [0, COLORS.BUBBLES, 1, COLORS.ANAKIWA],
  gradient2: [
    0,
    COLORS.ANAKIWA,
    0.4,
    COLORS.BUBBLES,
    0.6,
    COLORS.BUBBLES,
    1,
    COLORS.ANAKIWA,
  ],
};

export const CANVAS_SIZE: Dimensions = {
  height: 480,
  width: 640,
};

export const TILE_W: number = 60;
export const TILE_H: number = 34;

export const TILE = "tile" as const;
export const BLOCK = "block" as const;
export const PLAYER = "player" as const;

export const UP = "up" as const;
export const DOWN = "down" as const;
export const RIGHT = "right" as const;
export const LEFT = "left" as const;

export const LEVELS: Level[] = [
  { data: "microban001", title: "Level 01", shortTitle: "01" },
  { data: "microban002", title: "Level 02", shortTitle: "02" },
  { data: "microban003", title: "Level 03", shortTitle: "03" },
  { data: "microban004", title: "Level 04", shortTitle: "04" },
  { data: "microban005", title: "Level 05", shortTitle: "05" },
  { data: "microban007", title: "Level 06", shortTitle: "06" },
  { data: "microban009", title: "Level 07", shortTitle: "07" },
  { data: "microban011", title: "Level 08", shortTitle: "08" },
  { data: "microban012", title: "Level 09", shortTitle: "09" },
  { data: "microban013", title: "Level 10", shortTitle: "10" },
];
