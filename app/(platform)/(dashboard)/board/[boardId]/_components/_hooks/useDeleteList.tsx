import { deleteList } from "@/actions/delete-list";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

export const useDeleteList = (closeRef: React.RefObject<HTMLSelectElement>) => {
   const { execute: executeDelete } = useAction(deleteList, {
      onSuscess: (data) => {
         toast.success(`List ${data.title} deleted!`);
         closeRef.current?.click();
      },
      onError: (error) => {
         toast.error(error);
      },
   });

   const onDelete = (formData: FormData) => {
      const id = formData.get("id") as string;
      const boardId = formData.get("boardId") as string;

      executeDelete({ id, boardId });
   };

   return {
      onDelete,
   };
};
