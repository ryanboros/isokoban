import { FC } from "react";
import { Group, Line } from "react-konva";

import { COLORS } from "@/lib/game.constants";

const Wall: FC = () => (
  <Group>
    <Line
      closed
      fill={COLORS.DUSTY_GREY}
      points={[0, 0, 0, -7.5, -30, -24.5, -30, -17]}
      stroke="black"
      strokeWidth={1}
      perfectDrawEnabled={false}
    />
    <Line
      closed
      fill={COLORS.MINE_SHAFT}
      points={[0, 0, 0, -7.5, 30, -24, 30, -17]}
      stroke="black"
      strokeWidth={1}
      perfectDrawEnabled={false}
    />
    <Line
      closed
      fill={COLORS.SILVER}
      points={[0, -7.5, 30, -24.5, 0, -41.5, -30, -24.5]}
      stroke="black"
      strokeWidth={1}
      perfectDrawEnabled={false}
    />
  </Group>
);

export default Wall;
