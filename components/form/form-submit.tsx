"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
   children: React.ReactNode;
   disabled?: boolean;
   className?: string;
   variant?: "default" | "destructive" | "outline" | "ghost" | "secondary" | "link" | "primary";
}

export const FormSubmit = ({ children, className, disabled, variant = "primary" }: Props) => {
   const { pending } = useFormStatus();

   return (
      <Button
         disabled={pending || disabled}
         variant={variant}
         type="submit"
         size="sm"
         className={cn(className)}
      >
         {children}
      </Button>
   );
};
