"use client";

import { Form } from "@prisma/client";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import DesignArea from "./DesignArea";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import {ImSpinner2} from "react-icons/im"
import { useEffect, useState } from "react";
import useDesigner from "./hooks/useDesigner";



const FormBuilder = ({ form }: { form: Form }) => {

  const [isReady, setIsReady] = useState<boolean>(false);
  const {setElements, setSelectedElement} = useDesigner();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  // in order to work on mobile devices
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  // create sensors in order to differentiate between "click" and "drag".
  const sensors = useSensors(mouseSensor, touchSensor);
  
  useEffect(() => {
    if (isReady) return;

    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);

    const readyTimeout = setTimeout(() => setIsReady(true), 500);

    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady, setSelectedElement]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex w-full border-b-2 p-4 items-center justify-between gap-3">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            <SaveFormBtn id={form.id}/>
            <PublishFormBtn />
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/dark-paper.svg)]">
          <DesignArea />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
