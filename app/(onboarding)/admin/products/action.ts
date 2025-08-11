"use server";

import { ErrorMessages } from "@/app/enum/enum-messages";
import { FormState } from "@/app/types/actions-types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";

const productSchema = z.object({
  id: z.number().min(1),
  name: z.string(ErrorMessages.DEFAULT).min(2).max(100),
  description: z.string(ErrorMessages.DEFAULT).max(500).optional(),
  price: z.number(ErrorMessages.DEFAULT).min(0),
  image: z.string(ErrorMessages.DEFAULT).url().optional(),
  stock: z.number(ErrorMessages.DEFAULT).min(0),
  categoryId: z.number(ErrorMessages.DEFAULT).min(1),
  enterpriseId: z.number(ErrorMessages.DEFAULT).min(1),
});

type ProductForm = z.infer<typeof productSchema>;


export async function createProductAction(
  prevState: FormState<ProductForm>,
  formData: FormData
): Promise<FormState<ProductForm>> {
  const rawFormData = Object.fromEntries(formData.entries());

  const parsedFormData: Record<string, any> = {
    ...rawFormData,
    id: rawFormData.id ? Number(rawFormData.id) : undefined,
    price: rawFormData.price ? Number(rawFormData.price) : undefined,
    stock: rawFormData.stock ? Number(rawFormData.stock) : undefined,
    categoryId: rawFormData.categoryId ? Number(rawFormData.categoryId) : undefined,
    enterpriseId: rawFormData.enterpriseId ? Number(rawFormData.enterpriseId) : undefined,
  };
  const validatedFields = productSchema.safeParse(parsedFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error),
      values: parsedFormData as ProductForm,
    };
  }

  try {
    await prisma.product.create({
      data: validatedFields.data,
    });
    revalidatePath("/products");

    return { success: "Produto criado com sucesso!" };
  } catch (e) {
    return { error: "Não foi possível criar o produto." };
  }
}