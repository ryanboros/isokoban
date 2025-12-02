import { FC } from "react";
import { Circle, Group, Line } from "react-konva";

import { COLORS, GRADIENTS } from "@/lib/game.constants";

interface PlayerProps {
  x: number;
  y: number;
}

const Player: FC = ({ x, y }: PlayerProps) => {
  return (
    <Group x={x} y={y}>
      <Group offsetY={4}>
        <Line
          fillLinearGradientStartPoint={{ x: 0, y: -16 }}
          fillLinearGradientEndPoint={{ x: 0, y: 16 }}
          fillLinearGradientColorStops={GRADIENTS.gradient1}
          points={[
            14, -2.5, 21, -12, 21, -24, 10, -32, 0, -30, -10, -32, -21, -24,
            -21, -12, -14, -2.5,
          ]}
          closed
          stroke={COLORS.GEYSER}
          strokeWidth={1}
          tension={0.6}
          perfectDrawEnabled={false}
        />
        <Line
          fillLinearGradientStartPoint={{ x: -24, y: 0 }}
          fillLinearGradientEndPoint={{ x: 24, y: 0 }}
          fillLinearGradientColorStops={GRADIENTS.gradient2}
          points={[
            0, -4, 10, -4, 18, -12, 18, -24, 7, -29, 0, -27, -7, -29, -18, -24,
            -18, -12, -10, -4,
          ]}
          closed
          tension={0.6}
          perfectDrawEnabled={false}
        />
        <Line
          points={[6, -4, 18, -11, 18, -20, -18, -20, -18, -11, -6, -4]}
          tension={0.4}
          fill={COLORS.MALIBU}
          closed
          perfectDrawEnabled={false}
        />
      </Group>
      <Group offsetY={46}>
        <Circle
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: 0, y: 32 }}
          fillLinearGradientColorStops={GRADIENTS.gradient1}
          radius={16}
          stroke={COLORS.GEYSER}
          strokeWidth={1}
          perfectDrawEnabled={false}
        />
        <Circle
          radius={13}
          fillLinearGradientStartPoint={{ x: -16, y: 0 }}
          fillLinearGradientEndPoint={{ x: 16, y: 0 }}
          fillLinearGradientColorStops={GRADIENTS.gradient2}
          perfectDrawEnabled={false}
        />
        <Line
          points={[0, 13, 12.85, 1.13, -12.85, 1.13]}
          tension={0.6}
          fill={COLORS.MALIBU}
          closed
          perfectDrawEnabled={false}
        />
      </Group>
    </Group>
  );
};

export default Player;
