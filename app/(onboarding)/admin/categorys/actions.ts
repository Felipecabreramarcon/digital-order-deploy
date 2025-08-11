"use server";
import { ErrorMessageHelpers, ErrorMessages } from "@/app/enum/enum-messages";
import { FormState } from "@/app/types/actions-types";
import { authOptions } from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import z from "zod";

const categorySchema = z.object({
    name: z.string(ErrorMessages.DEFAULT).min(2, ErrorMessageHelpers.MIN_CHAR("Nome", 2)),
    description: z.string(ErrorMessages.DEFAULT).min(5, ErrorMessageHelpers.MIN_CHAR("Descrição", 5)),
    enterpriseId: z.number(ErrorMessages.DEFAULT).min(1, ErrorMessageHelpers.MIN_SELECT("Empresa", 1))
});

type CategoryCreateFormData = z.infer<typeof categorySchema>;

export async function createCategoryAction(
    prevState: FormState<CategoryCreateFormData>,
    formData: FormData
): Promise<FormState<CategoryCreateFormData>> {

    const rawFormData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        enterpriseId: formData.get("enterpriseId") ? Number(formData.get("enterpriseId")) : null,
    };
    const validatedFields = categorySchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error),
            values: rawFormData as CategoryCreateFormData,
        };
    }
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.enterpriseId) {
            return { error: "Empresa não encontrada para o usuário autenticado." };
        }

        await prisma.category.create({
            data: {
                name: validatedFields.data.name,
                description: validatedFields.data.description,
                enterpriseId: session.user.enterpriseId
            }
        })
        revalidatePath("/users");

        return { success: "Categoria criada com sucesso!" };

    } catch (e) {
        return { error: "Não foi possível criar a categoria." };
    }
}