"use server";
import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
   const { userId, orgId } = auth();

   if (!userId || !orgId) {
      return {
         error: "Unauthorized",
      };
   }

   const { id, boardId } = data;

   let List;

   try {
      List = await db.list.delete({
         where: { id, boardId, board: { orgId } },
      });
   } catch {
      return {
         error: "Failed to delete.",
      };
   }

   revalidatePath(`/organization/${orgId}`);
   return { data: List };
};

export const deleteList = createSafeAction(DeleteList, handler);
