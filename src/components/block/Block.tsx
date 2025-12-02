import { FC } from "react";
import { Group, Line } from "react-konva";

import { COLORS } from "@/lib/game.constants";

interface BlockProps {
  complete: boolean;
  x: number;
  y: number;
}

const Block: FC = ({ complete, x, y }: BlockProps) => {
  return (
    <Group x={x} y={y}>
      <Line
        closed
        fill={complete ? COLORS.SPRING_GREEN : COLORS.BLUE_RIBBON}
        opacity={0.75}
        points={[0, 0, 0, -30, -30, -47, -30, -17]}
        stroke="black"
        strokeWidth={1}
        perfectDrawEnabled={false}
      />
      <Line
        closed
        fill={complete ? COLORS.JAPANESE_LAUREL : COLORS.ROYAL_BLUE}
        opacity={0.75}
        points={[0, 0, 30, -17, 30, -47, 0, -30]}
        stroke="black"
        strokeWidth={1}
        perfectDrawEnabled={false}
      />
      <Line
        closed
        fill={complete ? COLORS.GREEN : COLORS.AZURE}
        opacity={0.75}
        points={[0, -30, 30, -47, 0, -64, -30, -47]}
        stroke="black"
        strokeWidth={1}
        perfectDrawEnabled={false}
      />
    </Group>
  );
};

export default Block;
