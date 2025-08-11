'use server'

import { ErrorMessageHelpers, ErrorMessages } from "@/app/enum/enum-messages";
import { FormState } from "@/app/types/actions-types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";


const enterpriseSchema = z.object({
    name: z.string(ErrorMessages.DEFAULT).min(2, ErrorMessageHelpers.MIN_CHAR("Nome", 2)),
    email: z.email("Email inválido"),
    avatar: z.url().optional(),
    cnpj: z.string(ErrorMessages.DEFAULT).min(14, ErrorMessageHelpers.MIN_CHAR("CNPJ", 14)),
});

type EnterpriseCreateFormData = z.infer<typeof enterpriseSchema>;

export async function createEnterpriseAction(
    prevState: FormState<EnterpriseCreateFormData>,
    formData: FormData
): Promise<FormState<EnterpriseCreateFormData>> {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = enterpriseSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error),
            values: rawFormData as EnterpriseCreateFormData,
        };
    }
    const toEditId = rawFormData.id as string | undefined;

    try {
        if (!toEditId)
            await prisma.enterprise.create({
                data: {
                    ...validatedFields.data
                }
            });
        else
            await prisma.enterprise.update({
                where: { id: Number(toEditId) },
                data: validatedFields.data
            });
        revalidatePath("/enterprises");

        return { success: `Empresa ${toEditId ? "atualizada" : "criada"} com sucesso!` };

    } catch (e) {
        return { error: `Não foi possível ${toEditId ? 'atualizar' : 'criar'} a empresa.` };
    }
}