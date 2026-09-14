"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Input from "@/components/generic/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForms, loginSchema } from "@/validations/auth/login";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authLoginService } from "@/services/auth";
import Link from "next/link";
import Alert from "../generic/alert";

export default function AuthLogin() {
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    setError,
  } = useForm<LoginForms>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: authLoginService,
    onMutate: () => {
      clearErrors("root");
    },
    onError: (err: AxiosError<{ error?: string }>) => {
      setError("root", { message: err?.response?.data?.error });
    },
    onSuccess: (data) => {
      if (data) {
        router.push("/panel");
      }
    },
  });

  const handelLogin = async (data: LoginForms) => {
    loginMutation.mutate(data);
  };
  return (
    <Card
      as="form"
      onSubmit={handleSubmit(handelLogin)}
      color="gradient-primary"
      className="max-w-[400px] w-full"
    >
      <Input
        wrapClasses="mb-4"
        {...register("email")}
        label="email"
        labelColor="white"
        msg={errors.email?.message}
        showMsg={!!errors.email?.message}
      />
      <Input
        wrapClasses="mb-6"
        {...register("password")}
        label="password"
        labelColor="white"
        msg={errors.password?.message}
        showMsg={!!errors.password?.message}
      />

      {!!errors.root?.message && (
        <Alert variant="text" className="mb-4" color="danger">
          {errors.root?.message}
        </Alert>
      )}

      <Btn
        className="w-full justify-center"
        icon="icon-right-arrow"
        iconPlace="end"
      >
        login
      </Btn>
      <div className="text-neutral-dark text-center mt-4">
        i don`t have an acount go to{" "}
        <Link
          href="/auth/register"
          className="text-white text-nowrap transition-all hover:text-primary-light ms-2"
        >
          create acount
        </Link>
      </div>
    </Card>
  );
}
