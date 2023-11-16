"use client";

import { ReactNode, createContext, useState } from "react";
import { FormElementInstance } from "../FormElement";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
};

export const DesignContext = createContext<DesignerContextType | null>(null);

export default function DesignContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  return (
    <DesignContext.Provider value={{ elements, addElement }}>
      {children}
    </DesignContext.Provider>
  );
}
