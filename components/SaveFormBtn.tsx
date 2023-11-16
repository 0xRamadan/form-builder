import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";

const SaveFormBtn = () => {
  return (
    <Button variant={"outline"} className="gap-2">
      <HiSaveAs className="h-4 w-4" />
      Save
    </Button>
  );
};

export default SaveFormBtn;