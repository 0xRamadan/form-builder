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

  designerComponent: DesignerComponent,

  formComponent: FormComponent,
  
  propertiesComponent: PropertiesComponent,
};

function DesignerComponent({ elementInstance }: {elementInstance : FormElementInstance}) {}
function FormComponent({ elementInstance }: {elementInstance : FormElementInstance}) {}
function PropertiesComponent({ elementInstance }: {elementInstance : FormElementInstance}) {}
