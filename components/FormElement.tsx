import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designAreaComponent: React.FC<{elementInstance: FormElementInstance}>;
  formComponent: React.FC<{elementInstance: FormElementInstance}>;
  propertiesComponent: React.FC<{elementInstance: FormElementInstance}>;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
