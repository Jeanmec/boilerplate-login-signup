import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordDto,
} from "@/validation/auth.validation";
import { useFormErrorNotifier } from "@/hooks/useFormErrorNotifier";

interface Props {
  email: string;
  onSubmit: (data: ResetPasswordDto) => void;
}

export default function ResetPasswordForm({ email, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email },
  });

  useFormErrorNotifier(errors);

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
        </label>
        <label className="flex flex-col gap-1">
          <span>Nouveau mot de passe</span>
          <input
            type="password"
            {...register("password")}
            className="input input-bordered"
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Réinitialiser
        </button>
      </form>
    </div>
  );
}
