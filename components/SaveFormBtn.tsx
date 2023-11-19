import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";
import { useTransition } from "react";
import useDesigner from "./hooks/useDesigner";
import { UpdateFormContent } from "@/actions/forms";
import { toast } from "./ui/use-toast";

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      const { error } = await UpdateFormContent(id, jsonElements);
      toast({
        title: "Success",
        description: "your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error as string,
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
