import { FormElements } from "./FormElement"
import SidebarBtnElement from "./SidebarBtnElement"

const DesignSidebarArea = () => {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
        <div className="text-sm p-4">Elements</div>
        <SidebarBtnElement formElement={FormElements.TextField}/>
    </aside>
  )
}

export default DesignSidebarArea