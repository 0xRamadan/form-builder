import { GetFormById } from "@/actions/forms";
import FormBuilder from "@/components/FormBuilder";

const BuilderPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data: form, error } = await GetFormById(Number(id));

  if (!form) throw new Error(error);

  return <FormBuilder form={form} />;
};

export default BuilderPage;
