"use client";

import { Form } from "@prisma/client";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import DesignArea from "./DesignArea";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import { ImSpinner2 } from "react-icons/im";
import { useEffect, useState } from "react";
import useDesigner from "./hooks/useDesigner";
import Confetti from "react-confetti";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Button } from "./ui/button";

const FormBuilder = ({ form }: { form: Form }) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const { setElements, setSelectedElement } = useDesigner();

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
      <div className="flex h-full w-full flex-col items-center justify-center">
        <ImSpinner2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (form.published) {
    <FormPublished form={form} />;
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex w-full flex-col">
        <nav className="flex w-full items-center justify-between gap-3 border-b-2 p-4">
          <h2 className="truncate font-medium">
            <span className="mr-2 text-muted-foreground">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            <SaveFormBtn id={form.id} />
            <PublishFormBtn id={form.id} />
          </div>
        </nav>
        <div className="relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/dark-paper.svg)]">
          <DesignArea />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

const FormPublished = ({ form }: { form: Form }) => {
  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;
  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={1000}
      />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="max-w-md">
          <h1 className="mb-10 border-b pb-2 text-center text-4xl font-bold text-primary">
            🎊🎊 Form Published 🎊🎊
          </h1>
          <h2 className="text-2xl">Share this form</h2>
          <h3 className="border-b pb-10 text-xl text-muted-foreground">
            Anyone with the link can view and submit the form
          </h3>
          <div className="my-4 flex w-full flex-col items-center gap-2 border-b pb-4">
            <Input className="w-full" readOnly value={shareUrl} />
            <Button
              className="mt-2 w-full"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                toast({
                  title: "Copied!",
                  description: "Link copied to clipboard",
                });
              }}
            >
              Copy link
            </Button>
          </div>
          <div className="flex justify-between">
            <Button variant={"link"} asChild>
              <Link href={"/"} className="gap-2">
                <BsArrowLeft />
                Go back home
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href={`/forms/${form.id}`} className="gap-2">
                Form details
                <BsArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormBuilder;
