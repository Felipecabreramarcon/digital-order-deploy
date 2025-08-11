"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { CreateProductForm } from "./form";

export const ProductModal = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Criar Produto</DialogTitle>
        <CreateProductForm />
      </DialogContent>
    </Dialog>
  );
};
