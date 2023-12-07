import { GetFormByUrl } from "@/actions/forms";
import { FormElementInstance } from "@/components/FormElement";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";

const submitPage = async ({ params }: { params: { formUrl: string } }) => {
  const form = await GetFormByUrl(params.formUrl);

  if (!form) throw new Error("form not found.");

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
};

export default submitPage;
