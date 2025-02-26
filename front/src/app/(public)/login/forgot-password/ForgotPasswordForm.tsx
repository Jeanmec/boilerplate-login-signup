import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/validation/authSchema";
import { useFormErrorNotifier } from "@/hooks/useFormErrorNotifier";

interface Props {
  onSubmit: (email: string) => void;
}

export default function ForgotPasswordForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useFormErrorNotifier(errors);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">Mot de passe oublié ?</h1>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data.email))}
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
        </label>
        <button type="submit" className="btn btn-primary">
          Envoyer
        </button>
      </form>
    </div>
  );
}
