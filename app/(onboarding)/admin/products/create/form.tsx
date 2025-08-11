"use client";
import { FormColumn } from "@/app/components/column";
import { DialogSuccessCloser } from "@/app/components/dialog-success-closer";
import { InputField } from "@/app/components/input-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input, PasswordInput } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { createProductAction } from "../action";
import { prisma } from "@/lib/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CreateProductForm = () => {
  const [state, formAction, loading] = useActionState(createProductAction, {});
  const defaultValues = state.values;
  const errors = state.errors?.fieldErrors;

  return (
    <DialogSuccessCloser loading={loading} success={!!state.success}>
      <FormColumn>
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
        <InputField error={errors?.price} label="Preço">
          <Input
            name="price"
            type="number"
            placeholder="Digite o preço"
            defaultValue={defaultValues?.price}
          />
        </InputField>
        <InputField error={errors?.categoryId} label="Categoria">
          <CategorySelect defaultValue={defaultValues?.categoryId.toString()} />
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

export const CategorySelect = ({ defaultValue }: { defaultValue?: string }) => {
  const [value, setValue] = useState<string>();
  const [categories, setCategories] = useState<{ 
    id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await prisma.category.findMany({ select: { id: true, name: true } });
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  return (
    <Select name="category" value={value} onValueChange={setValue} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id.toString()}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
