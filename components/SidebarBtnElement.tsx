import { useDraggable } from "@dnd-kit/core";
import { FormElement } from "./FormElement";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designBtnElement;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "flex flex-col gap-2 w-[120px] h-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="w-8 h-8 cursor-grab text-primary" />
      <p className="text-sm">{label}</p>
    </Button>
  );
}

export function SidebarBtnElementDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designBtnElement;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignBtnElement: true,
    },
  });

  return (
    <Button
      variant="outline"
      className="flex flex-col gap-2 w-[120px] h-[120px] cursor-grab"
    >
      <Icon className="w-8 h-8 cursor-grab text-primary" />
      <p className="text-sm">{label}</p>
    </Button>
  );
}

export default SidebarBtnElement;
