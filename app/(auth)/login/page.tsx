"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input, PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CenteredPageWrapper } from "@/app/components/centered-page-wrapper";
import { InputField } from "@/app/components/input-field";
import { FormColumn } from "@/app/components/column";
import { SliderLoader } from "@/app/components/loadings/slider-loader";
import { useLoginForm } from "./useLoginForm";
import { GiKnifeFork } from "react-icons/gi";
import { ErrorText } from "@/app/components/error-text";

export default function Home() {
  const { errors, handleSubmit, register, isPending } = useLoginForm();
  return (
    <CenteredPageWrapper>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <GiKnifeFork />
            Digital Order
          </CardTitle>
          <CardTitle className="text-xl">Bem vindo de volta!</CardTitle>

          <CardDescription>
            faça login na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SliderLoader visible loading={!!isPending}>
            <FormColumn
              onSubmit={handleSubmit}
              className="gap-3 w-full p-1"
              action=""
            >
              <InputField error={errors.email?.message} label="Email">
                <Input
                  {...register("email")}
                  error={errors.email?.message}
                  placeholder="Insira seu email"
                />
              </InputField>
              <InputField error={errors.password?.message} label="Senha">
                <PasswordInput
                  {...register("password")}
                  placeholder="Insira sua senha"
                />
              </InputField>
              <div className="relative">
                <ErrorText>{errors?.root?.message}</ErrorText>
              </div>
              <Button
                type="submit"
                variant={"login"}
                size={"lg"}
                className="mt-4 bg-primary"
              >
                Login
              </Button>
            </FormColumn>
          </SliderLoader>
        </CardContent>
      </Card>
    </CenteredPageWrapper>
  );
}
