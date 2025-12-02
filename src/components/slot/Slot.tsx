import { FC } from "react";
import { Group, Line } from "react-konva";

import { COLORS } from "@/lib/game.constants";

const Slot: FC = () => (
  <Group>
    <Line
      closed
      fill={COLORS.SILVER}
      points={[0, -3, 24, -17, 0, -31, -24, -17]}
      perfectDrawEnabled={false}
    />
    <Line
      points={[24, -17, 0, -31, -24, -17]}
      strokeWidth={1}
      stroke="black"
      perfectDrawEnabled={false}
    />
    <Line
      points={[-24, -17, 0, -3, 24, -17]}
      strokeWidth={1}
      stroke={COLORS.DUSTY_GREY}
      perfectDrawEnabled={false}
    />
    <Line
      closed
      fill={COLORS.MINE_SHAFT}
      points={[0, -7, 18, -17, 0, -27, -18, -17]}
      perfectDrawEnabled={false}
    />
    <Line
      closed
      fill={COLORS.SILVER}
      points={[0, -10, 12, -17, 0, -24, -12, -17]}
      perfectDrawEnabled={false}
    />
    <Line
      closed
      fill={COLORS.MINE_SHAFT}
      points={[0, -13, 6, -17, 0, -21, -6, -17]}
      perfectDrawEnabled={false}
    />
  </Group>
);

export default Slot;
