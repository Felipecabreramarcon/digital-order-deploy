'use server'
import { prisma } from "@/lib/prisma";
import z from "zod";

import bcrypt from "bcrypt";
import { User } from "next-auth";



const loginSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;


export async function authorize(
    credentials: Record<"email" | "password", string> | undefined
): Promise<User | null> {
    const validatedFields = loginSchema.safeParse(credentials);

    if (!validatedFields.success) {
        throw new Error(validatedFields.error.message)
    }
    const user = await prisma.user.findUnique({
        where: { email: credentials?.email as string }
    });

    if (!user) throw new Error("Usuário não encontrado");

    const isValid = await bcrypt.compare(credentials?.password as string, user.password);
    if (!isValid) throw new Error("Senha incorreta");

    return { id: String(user.id), email: user.email, name: user.name, enterpriseId: user.enterpriseId || undefined };
}
