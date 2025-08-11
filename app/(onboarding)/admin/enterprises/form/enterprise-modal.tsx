"use client";
import { FormModal } from "@/app/types/form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Enterprise } from "../_components/enterpriseTable";
import { EnterpriseForm } from "./enterprise-form";

export const EnterpriseModal = ({
  children,
  toEdit,
}: FormModal<Enterprise>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Criar Novo Empresa</DialogTitle>
        <EnterpriseForm toEditValues={toEdit} />
      </DialogContent>
    </Dialog>
  );
};
