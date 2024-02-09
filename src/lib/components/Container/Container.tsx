import {
  ActionIcon,
  Badge,
  Card,
  Group,
  NumberFormatter,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconColorPicker, IconHandStop, IconStar } from "@tabler/icons-react";
import { useContainerContext } from "../../context/ContainerContext";
import { Container } from "../../types/container";
import Measure from "../Measure/Measure";
import style from "./container.module.css";

interface ContainerProps {
  container: Container;
}

export default function Container({ container }: Readonly<ContainerProps>) {
  const { current, setCurrent } = useContainerContext();
  const isCurrent = current?.id === container.id;
  const { multiplicator, precise } = calculateBestFitting(current, container);
  return (
    <Card shadow="sm" radius="md" withBorder p="md">
      <Card.Section p="sm" className={style.divider}>
        <Stack>
          <Group justify="space-between">
            <Group>
              <Text fw={900}>{container.name}</Text>
              {container?.handle && (
                <Tooltip label="Has a handle">
                  <IconHandStop size={16}/>
                </Tooltip>
              )}
              {container?.extra && (
                <Tooltip label="Has an extra">
                  <IconStar size={16}/>
                </Tooltip>
              )}
            </Group>
            {!isCurrent && (
              <ActionIcon onClick={() => setCurrent(container)}>
                <IconColorPicker stroke={1.2} />
              </ActionIcon>
            )}
          </Group>
          <Group justify="space-between">
            <Measure label="width">
              <NumberFormatter
                suffix="cm"
                thousandSeparator
                value={container.width}
              />
            </Measure>
            <Measure label="depth">
              <NumberFormatter
                suffix="cm"
                thousandSeparator
                value={container.depth}
              />
            </Measure>
            <Measure label="height">
              <NumberFormatter
                suffix="cm"
                thousandSeparator
                value={container.height}
              />
            </Measure>
            <Measure label="volume">
              <NumberFormatter
                suffix="ml"
                thousandSeparator
                value={container.volume}
              />
            </Measure>
          </Group>
        </Stack>
      </Card.Section>
      {current && (
        <Card.Section p="sm">
          <Group justify="center">
            {isCurrent && <Badge>Base container</Badge>}
            {!isCurrent && multiplicator === 1 && <Badge color="green.4">Fits</Badge>}
            {!isCurrent && multiplicator > 1 && (
              <Badge color={`green.${Math.min(4 + multiplicator, 9)}`}>
                Fits x{multiplicator}
              </Badge>
            )}
            {!isCurrent && precise && <Badge color="gold">Precise</Badge>}
          </Group>
        </Card.Section>
      )}
    </Card>
  );
}

interface FittingResult {
  fits: boolean;
  precise: boolean;
  multiplicator: number;
}

function calculateBestFitting(
  bottom: Container | undefined,
  top: Container | undefined
) {
  if (!bottom || !top) {
    return {
      fits: false,
      precise: false,
      multiplicator: 0,
    };
  }
  const given = calculateFitting(bottom, top);
  const flipped = calculateFitting(bottom, flip(top));

  if (flipped.multiplicator > given.multiplicator) {
    return flipped;
  } else {
    return given;
  }
}

function calculateFitting(bottom: Container, top: Container): FittingResult {
  const x = bottom.width / top.width;
  const y = bottom.depth / top.depth;
  const multiplicator = Math.floor(x) * Math.floor(y);
  const fits = multiplicator > 1;
  const precise = isPrecise(x) && isPrecise(y);

  return {
    fits,
    precise,
    multiplicator,
  };
}

function flip(container: Container): Container {
  return { ...container, width: container.depth, depth: container.width };
}

function isPrecise(n: number): boolean {
  return n - Math.floor(n) < n * 0.1;
}
