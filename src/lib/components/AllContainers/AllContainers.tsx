import { Group } from "@mantine/core";
import { useContainerContext } from "../../context/ContainerContext";
import Container from "../Container/Container";

export default function AllContainers() {
  const { containers } = useContainerContext();
  return (
    <Group align="flex-start">
      {containers.map((c) => (
        <Container container={c} key={c.id} />
      ))}
    </Group>
  );
}
