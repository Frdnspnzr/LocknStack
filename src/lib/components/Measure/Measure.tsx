import { Stack, Text } from "@mantine/core";

interface MeasureProps extends React.PropsWithChildren {
  label: string;
}

export default function Measure({ label, children }: Readonly<MeasureProps>) {
  return (
    <Stack align="center" gap={0}>
      <Text fw={300} size="xs" c="dimmed">
        {label}
      </Text>
      <Text fw={500} size="sm">
        {children}
      </Text>
    </Stack>
  );
}
