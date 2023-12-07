"use client";

import { List } from "@prisma/client";

import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";

import { MoreHorizontal, X } from "lucide-react";
import { useDeleteList } from "./_hooks/useDeleteList";
import { ElementRef, useRef } from "react";
import { useCopyList } from "./_hooks/useCopyList";

interface Props {
   data: List;
   onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: Props) => {
   const closeRef = useRef<ElementRef<"button">>(null);
   const { onDelete } = useDeleteList(closeRef);
   const { onCopy } = useCopyList(closeRef);

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button className="h-auto w-auto p-2" variant="ghost">
               <MoreHorizontal className="h-4 w-4" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
            <div className="text-sm font-medium text-center text-neutral-600 pb-4">
               List actions
            </div>
            <PopoverClose ref={closeRef} asChild>
               <Button
                  className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                  variant="ghost"
               >
                  <X className="h-4 w-4" />
               </Button>
            </PopoverClose>
            <Button
               onClick={onAddCard}
               className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
               variant="ghost"
            >
               Add card...
            </Button>
            <form action={onCopy}>
               <input hidden name="id" id="id" value={data.id} />
               <input hidden name="boardId" id="boardId" value={data.boardId} />
               <FormSubmit
                  variant="ghost"
                  className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
               >
                  Copy list...
               </FormSubmit>
            </form>
            <Separator />
            <form action={onDelete}>
               <input hidden name="id" id="id" value={data.id} />
               <input hidden name="boardId" id="boardId" value={data.boardId} />
               <FormSubmit
                  variant="ghost"
                  className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
               >
                  Detete this list...
               </FormSubmit>
            </form>
         </PopoverContent>
      </Popover>
   );
};
