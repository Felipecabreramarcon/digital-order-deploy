"use client";
import { FormModal } from "@/app/types/form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormatedUser } from "../page";
import { UserForm } from "./user-form";

export const UserModal = ({ toEdit, children }: FormModal<FormatedUser>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Criar Novo Usuário</DialogTitle>
        <UserForm toEdit={toEdit} />
      </DialogContent>
    </Dialog>
  );
};
