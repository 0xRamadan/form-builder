import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import useDesigner from "./hooks/useDesigner";
import { ElementsType, FormElementInstance, FormElements } from "./FormElement";
import { idRandomGenerator } from "@/lib/idRandomGenerator";

const DesignDropArea = () => {
  const { elements, addElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      console.log(event);
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignBtnElement = active.data?.current?.isDesignBtnElement;
      if (isDesignBtnElement) {
        const type = active.data?.current?.type;

        const newElement = FormElements[type as ElementsType].construct(
          idRandomGenerator()
        );
        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="p-4 w-full">
      <div
        ref={droppable.setNodeRef}
        className={cn(
          "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
          droppable.isOver && "ring-2 ring-primary/20"
        )}
      >
        {droppable.isOver && (
          <div className="w-full p-4">
            <div className="h-[120px] rounded-md bg-primary/20"></div>
          </div>
        )}
        {!droppable.isOver && elements.length === 0 && (
          <p className="text-3xl font-bold text-muted-foreground flex flex-grow items-center">
            Drop here
          </p>
        )}
        {elements.length > 0 && (
          <div className="flex flex-col text-background w-full gap-2 p-4">
            {elements.map((element) => (
              <DesignerElementWrapper key={element.id} element={element} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const DesignerElement = FormElements[element.type].designAreaComponent;
  return <DesignerElement elementInstance={element} />;
}

export default DesignDropArea;
