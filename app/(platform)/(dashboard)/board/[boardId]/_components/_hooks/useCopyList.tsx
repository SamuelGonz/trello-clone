import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { copyList } from "@/actions/copy-list";

export const useCopyList = (closeRef: React.RefObject<HTMLSelectElement>) => {
   const { execute: executeCopy } = useAction(copyList, {
      onSuscess: (data) => {
         toast.success(`List ${data.title} copied!`);
         closeRef.current?.click();
      },
      onError: (error) => {
         toast.error(error);
      },
   });

   const onCopy = (formData: FormData) => {
      const id = formData.get("id") as string;
      const boardId = formData.get("boardId") as string;

      executeCopy({ id, boardId });
   };

   return {
      onCopy,
   };
};
