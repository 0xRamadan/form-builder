"use client";

import { HiCursorClick } from "react-icons/hi";
import { FormElementInstance, FormElements } from "./FormElement";
import { Button } from "./ui/button";
import { useRef } from "react";

function FormSubmitComponent({
  formUrl,
  content,
}: {
  content: FormElementInstance[];
  formUrl: string;
}) {

  const formValues = useRef<{[key:string]: string}>({})
  

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  }


  const submitForm = () => {
    console.log("form Values:", formValues.current)
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded border bg-background p-8 shadow-xl shadow-blue-700">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            submitForm();
          }}
        >
          <HiCursorClick className="mr-2" />
          Submit
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
