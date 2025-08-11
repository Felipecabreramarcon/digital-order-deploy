"use server";

import { FormState } from "@/app/types/actions-types";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/src/generated/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import bcrypt from "bcrypt";
import { ErrorMessageHelpers, ErrorMessages } from "@/app/enum/enum-messages";

const userSchema = z.object({
    name: z.string(ErrorMessages.DEFAULT).min(2, ErrorMessageHelpers.MIN_CHAR("Nome", 2)),
    email: z.email("Email inválido"),
    password: z.string(ErrorMessages.DEFAULT).min(6, ErrorMessageHelpers.MIN_CHAR("Senha", 6)),
    role: z.enum(Object.values(UserRole), "Cargo inválido"),
});

type UserCreateFormData = z.infer<typeof userSchema>;



export async function createUserAction(
    prevState: FormState<UserCreateFormData>,
    formData: FormData
): Promise<FormState<UserCreateFormData>> {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = userSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error),
            values: rawFormData as UserCreateFormData,
        };
    }
    try {
        const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

        await prisma.user.create({
            data: { ...validatedFields.data, password: hashedPassword }
        });
        revalidatePath("/users");

        return { success: "Usuário criado com sucesso!" };

    } catch (e) {
        return { error: "Não foi possível criar o usuário." };
    }
}