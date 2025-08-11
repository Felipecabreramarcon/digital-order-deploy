"use client";
import { FormColumn } from "@/app/components/column";
import { DialogSuccessCloser } from "@/app/components/dialog-success-closer";
import { InputField } from "@/app/components/input-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input, PasswordInput } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useActionState, useState } from "react";
import { createUserAction } from "../actions";
import { FormatedUser } from "../page";
import { RoleLabels } from "../type";

export const UserForm = ({ toEdit }: { toEdit?: FormatedUser }) => {
  const [state, formAction, loading] = useActionState(createUserAction, {});

  const defaultValues = toEdit || state.values;
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
        <InputField error={errors?.email} label="Email">
          <Input
            name="email"
            placeholder="Digite o email "
            defaultValue={defaultValues?.email}
          />
        </InputField>
        <InputField error={errors?.password} label="Senha">
          <PasswordInput
            defaultValue={defaultValues?.password}
            name="password"
            autoComplete="new-password"
            placeholder="Digite a senha "
          />
        </InputField>
        <InputField error={errors?.role} className="w-full" label="Cargo">
          <RoleSelect defaultValue={defaultValues?.role} />
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

export const RoleSelect = ({ defaultValue }: { defaultValue?: string }) => {
  const [value, setValue] = useState<string>(defaultValue || "");
  return (
    <Select
      name="role"
      defaultValue={defaultValue}
      onValueChange={setValue}
      value={value}
    >
      <SelectTrigger>
        {value
          ? RoleLabels[value as keyof typeof RoleLabels]
          : "Selecione o cargo"}
      </SelectTrigger>
      <SelectContent>
        {Object.entries(RoleLabels).map(([key, value], index) => (
          <SelectItem key={index} value={key}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
