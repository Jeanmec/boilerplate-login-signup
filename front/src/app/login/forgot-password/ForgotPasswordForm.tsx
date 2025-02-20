"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/validation/authSchemas";
import { postRequest } from "@/lib/request";
import { notify } from "@/lib/toastService";

interface Props {
  setEmail: (email: string) => void;
}

export default function ForgotPasswordForm({ setEmail }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setEmail(data.email);
    const response = await postRequest("/auth/forgot-password", data);

    if (response && response.message) {
      notify.info(response.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">Mot de passe oublié ?</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 flex flex-col gap-4"
      >
        <p className="text-center">
          Entrez votre email pour recevoir un code de réinitialisation.
        </p>
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="email"
            {...register("email")}
            className="input input-bordered"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </label>
        <button type="submit" className="btn btn-primary">
          Envoyer
        </button>
      </form>
    </div>
  );
}
