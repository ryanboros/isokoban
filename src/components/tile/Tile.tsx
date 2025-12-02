import { FC } from "react";
import { Group } from "react-konva";

import Floor from "../floor/Floor";
import Slot from "../slot/Slot";
import Wall from "../wall/Wall";

interface TileProps {
  slot: boolean;
  wall: boolean;
  x: number;
  y: number;
}

const Tile: FC = ({ slot, wall, x, y }: TileProps) => {
  const slotElem = slot ? <Slot /> : null;
  const wallElem = wall ? <Wall /> : null;

  return (
    <Group x={x} y={y}>
      <Floor />
      {slotElem}
      {wallElem}
    </Group>
  );
};

export default Tile;
