import { FormElements } from "./FormElement";
import SidebarBtnElement from "./SidebarBtnElement";
import { Separator } from "./ui/separator";

function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 place-items-center gap-2 md:grid-cols-2">
        <p className="col-span-1 my-2 place-self-start text-sm text-muted-foreground md:col-span-2">
          Layout elements
        </p>
        <SidebarBtnElement formElement={FormElements.TitleField} />

        <p className="col-span-1 my-2 place-self-start text-sm text-muted-foreground md:col-span-2">
          Form elements
        </p>
        <SidebarBtnElement formElement={FormElements.TextField} />
      </div>
    </div>
  );
}

export default FormElementsSidebar;
