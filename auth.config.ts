import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorize } from "./app/api/auth/authorize";


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" as const, },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" }
            },
            authorize: authorize
        },)
    ],
    pages: {
        signIn: "/login",
        error: "/login"
    },
};

export default NextAuth(authOptions);
