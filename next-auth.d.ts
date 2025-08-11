import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        enterpriseId?: number;
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user?: User;
    }
}