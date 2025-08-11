"use client";
import { createCategoryAction } from "../actions";
import { DialogSuccessCloser } from "@/app/components/dialog-success-closer";
import { FormColumn } from "@/app/components/column";
import { InputField } from "@/app/components/input-field";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const CategoryForm = () => {
  const [state, formAction, loading] = useActionState(createCategoryAction, {});
  const defaultValues = state.values;
  const errors = state.errors?.fieldErrors;

  return (
    <DialogSuccessCloser loading={loading} success={!!state.success}>
      <FormColumn className="p-1" action={formAction}>
        <InputField error={errors?.name} label="Nome">
          <Input
            name="name"
            placeholder="Digite o nome"
            defaultValue={defaultValues?.name}
          />
        </InputField>
        <InputField error={errors?.description} label="Descrição">
          <Input
            name="description"
            placeholder="Digite a descrição"
            defaultValue={defaultValues?.description}
          />
        </InputField>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancelar</Button>
          </DialogClose>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </FormColumn>
    </DialogSuccessCloser>
  );
};
