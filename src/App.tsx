import { Container } from "@mantine/core";
import AllContainers from "./lib/components/AllContainers/AllContainers";
import ContainerContextProvider from "./lib/context/ContainerContext";

function App() {
  return (
    <ContainerContextProvider>
      <Container size="min(1200px, 95vw)" p="xl">
        <AllContainers />
      </Container>
    </ContainerContextProvider>
  );
}

export default App;
