"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/validation/authSchema";
import { postRequest } from "@/lib/request";
import { useToastRedirection } from "@/app/providers/ToastRedirectionContext";

interface Props {
  email: string;
}

export default function ResetPasswordForm({ email }: Props) {
  const { setToastRedirection } = useToastRedirection();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email },
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    const response = await postRequest("/auth/reset-password", data);

    if (response && response.message) {
      setToastRedirection(response.message, "success", "/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">Réinitialiser le mot de passe</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 flex flex-col gap-4"
      >
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="email"
            {...register("email")}
            className="input input-bordered"
            disabled
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Code</span>
          <input
            type="text"
            {...register("code")}
            className="input input-bordered"
          />
          {errors.code && (
            <p className="text-red-500 text-sm">{errors.code.message}</p>
          )}
        </label>
        <label className="flex flex-col gap-1">
          <span>Nouveau mot de passe</span>
          <input
            type="password"
            {...register("password")}
            className="input input-bordered"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </label>
        <button type="submit" className="btn btn-primary">
          Réinitialiser
        </button>
      </form>
    </div>
  );
}
