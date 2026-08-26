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
import toast from "react-hot-toast";

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
    <form
      className="flex flex-col items-center justify-center min-h-screen py-section"
      onSubmit={handleSubmit(handelRegister)}
    >
      <label
        htmlFor="avatar-input"
        className="cursor-pointer w-28 h-28 bg-neutral rounded-full mb-4 flex items-center justify-center"
      >
        <i className="icon-avatar text-10xl"></i>
      </label>
      <input
        type="file"
        className="hidden"
        {...register("avatar")}
        name=""
        id="avatar-input"
      />
      <Card className="w-[400px]">
        <Input
          wrapClasses="mb-4"
          {...register("name")}
          label="name"
          msg={errors.name?.message}
          showMsg={!!errors.name?.message}
        />
        <Input
          wrapClasses="mb-4"
          {...register("email")}
          label="email"
          msg={errors.email?.message}
          showMsg={!!errors.email?.message}
        />
        <Input
          wrapClasses="mb-4"
          {...register("password")}
          label="password"
          msg={errors.password?.message}
          showMsg={!!errors.password?.message}
        />
        <Input
          wrapClasses="mb-6"
          {...register("confirm_password")}
          label="confirm password"
          msg={errors.confirm_password?.message}
          showMsg={!!errors.confirm_password?.message}
        />

        {!!errors.root?.message && (
          <Alert variant="text" className="mb-4" color="danger">
            {errors.root?.message}
          </Alert>
        )}

        <Btn className="w-full justify-center">sign up</Btn>
        <div className="text-dim-light text-center mt-4">
          i have an acount go to
          <Link
            href="/auth/login"
            className="text-dim-dark transition-all hover:text-primary ms-2"
          >
            login
          </Link>
        </div>
      </Card>
    </form>
  );
}
