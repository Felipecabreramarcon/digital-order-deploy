"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof schema>;

export const useLoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginFormData) => {
    startTransition(async () => {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/admin",
      });
      if (res?.url) router.push(res.url);
      if (res?.error)
        setError("root", {
          message: res.error,
        });
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
  };
};
