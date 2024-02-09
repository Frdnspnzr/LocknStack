import { createContext, useContext, useMemo, useState } from "react";
import data from "../../data/hpl.json";
import { Container } from "../types/container";

interface ContainerContextType {
  containers: Container[];
  current: Container | undefined;
  setCurrent: (container: Container) => void;
}

const containerContext = createContext<ContainerContextType>({
  containers: [],
  current: undefined,
  setCurrent: () => {},
});

export function useContainerContext() {
  const context = useContext(containerContext);
  if (!context) {
    throw new Error(
      "useContainerContext must be used within a ContainerContextProvider"
    );
  }
  return context;
}

export default function ContainerContextProvider({
  children,
}: React.PropsWithChildren) {
  const [current, setCurrent] = useState<Container | undefined>(undefined);
  const value = useMemo<ContainerContextType>(
    () => ({
      containers: data.map((c) => ({
        ...c,
        handle: c.handle || false,
        extra: c.extra || false,
      })),
      current,
      setCurrent,
    }),
    [current, setCurrent]
  );
  return (
    <containerContext.Provider value={value}>
      {children}
    </containerContext.Provider>
  );
}
