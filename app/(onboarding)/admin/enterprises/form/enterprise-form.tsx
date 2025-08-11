"use client";
import { FormColumn } from "@/app/components/column";
import { DialogSuccessCloser } from "@/app/components/dialog-success-closer";
import { InputField } from "@/app/components/input-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input, PasswordInput } from "@/components/ui/input";
import { useActionState } from "react";
import { createEnterpriseAction } from "../action";
import { formatCNPJ } from "@/app/helpers/mask";
import { Enterprise } from "../_components/enterpriseTable";

export const EnterpriseForm = ({
  toEditValues,
}: {
  toEditValues?: Enterprise;
}) => {
  const [state, formAction, loading] = useActionState(
    createEnterpriseAction,
    {}
  );

  const defaultValues = toEditValues || state.values;
  const errors = state.errors?.fieldErrors;
  console.log(state);
  return (
    <DialogSuccessCloser loading={loading} success={!!state.success}>
      <FormColumn className="p-2" action={formAction}>
        <input
          name="id"
          className="hidden"
          defaultValue={(defaultValues as Enterprise)?.id}
        />
        <InputField error={errors?.name} label="Nome">
          <Input
            name="name"
            placeholder="Digite o nome"
            defaultValue={defaultValues?.name}
          />
        </InputField>
        <InputField error={errors?.email} label="Email">
          <Input
            name="email"
            placeholder="Digite o email "
            defaultValue={defaultValues?.email || ""}
          />
        </InputField>
        <InputField error={errors?.cnpj} className="w-full" label="CNPJ">
          <Input
            name="cnpj"
            placeholder="Digite o cnpj "
            onChange={(e) => {
              e.target.value = formatCNPJ(e.target.value);
            }}
            defaultValue={defaultValues?.cnpj}
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
