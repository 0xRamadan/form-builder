"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../FormElement";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
};

export const TextFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },

  designAreaComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

function DesignerComponent({ elementInstance }: {elementInstance : FormElementInstance}) {return <div>design component</div>}
function FormComponent({ elementInstance }: {elementInstance : FormElementInstance}) {return <div>form component</div>}
function PropertiesComponent({ elementInstance }: {elementInstance : FormElementInstance}) {return <div>properties component</div>}
