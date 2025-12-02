import { FC } from "react";
import { Group, Line } from "react-konva";

import { COLORS } from "@/lib/game.constants";

const Floor: FC = () => (
  <Group>
    <Line
      closed
      fill={COLORS.TANGERINE}
      points={[0, 0, 0, 20, -30, 3, -30, -17]}
      stroke="black"
      strokeWidth={1}
      perfectDrawEnabled={false}
    />
    <Line
      closed
      fill={COLORS.RED}
      points={[0, 0, 30, -17, 30, 3, 0, 20]}
      stroke="black"
      strokeWidth={1}
      perfectDrawEnabled={false}
    />
    <Line
      closed
      fill="white"
      points={[0, 0, 30, -17, 0, -34, -30, -17]}
      stroke="black"
      strokeWidth={1}
      perfectDrawEnabled={false}
    />
  </Group>
);

export default Floor;
