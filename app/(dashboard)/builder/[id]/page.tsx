import { GetFormById } from "@/actions/forms";

const FormBuilderPage = async ({ formId }: { formId: string }) => {
  const { data: form, error } = await GetFormById(Number(formId));

  if (!form) throw new Error(error!);

  return <div>{form.name}</div>;
};

export default FormBuilderPage;
