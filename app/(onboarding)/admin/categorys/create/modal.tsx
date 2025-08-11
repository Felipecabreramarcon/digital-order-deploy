import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { CategoryForm } from "./form";

export const CategoryModal = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Criar Nova Catogoria</DialogTitle>
        <CategoryForm />
      </DialogContent>
    </Dialog>
  );
};
