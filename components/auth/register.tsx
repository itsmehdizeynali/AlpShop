"use client";

import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Input from "@/components/generic/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForms, registerSchema } from "@/validations/auth/register";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { authRegisterService } from "@/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Alert from "../generic/alert";

export default function AuthRegister({
  isAdmin = false,
}: {
  isAdmin?: boolean;
}) {
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    setError,
  } = useForm<RegisterForms>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: authRegisterService,
    onMutate: () => {
      clearErrors("root");
    },
    onError: (err: AxiosError<{ error?: string }>) => {
      setError("root", { message: err?.response?.data?.error });
    },
    onSuccess: (data) => {
      if (data) {
        router.push("/auth/login");
      }
    },
  });

  const handelRegister = async (data: RegisterForms) => {
    const role = isAdmin ? "ADMIN" : "USER";
    registerMutation.mutate({ formData: data, role });
  };
  return (
    <Card
      as="form"
      onSubmit={handleSubmit(handelRegister)}
      color="gradient-primary"
      className="max-w-[400px] w-full"
    >
      <Input
        wrapClasses="mb-4"
        {...register("name")}
        label="name"
        labelColor="white"
        msg={errors.name?.message}
        showMsg={!!errors.name?.message}
      />
      <Input
        wrapClasses="mb-4"
        {...register("email")}
        label="email"
        labelColor="white"
        msg={errors.email?.message}
        showMsg={!!errors.email?.message}
      />
      <Input
        wrapClasses="mb-4"
        {...register("password")}
        label="password"
        labelColor="white"
        msg={errors.password?.message}
        showMsg={!!errors.password?.message}
      />
      <Input
        wrapClasses="mb-6"
        {...register("confirm_password")}
        label="confirm password"
        labelColor="white"
        msg={errors.confirm_password?.message}
        showMsg={!!errors.confirm_password?.message}
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
      <div className="text-neutral-dark text-center text-sm mt-4">
        i have an acount go to
        <Link
          href="/auth/login"
          className="text-white transition-all hover:text-primary-light ms-2"
        >
          login
        </Link>
      </div>
    </Card>
  );
}
