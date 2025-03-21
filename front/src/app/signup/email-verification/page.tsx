"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignOutButton from "@/app/components/LogOutButton";
import { useToastRedirection } from "@/providers/ToastRedirectionContext";
import { notify } from "@/lib/toastService";
import { userService } from "@/services/user.service";
import {
  EmailVerificationCodeDto,
  emailVerificationCodeSchema,
} from "@/validation/auth.validation";
import { useFormErrorNotifier } from "@/hooks/useFormErrorNotifier";
import { useState } from "react";

export default function EmailVerification() {
  const { setToastRedirection } = useToastRedirection();
  const [newCode, setNewCode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationCodeDto>({
    resolver: zodResolver(emailVerificationCodeSchema),
  });

  useFormErrorNotifier(errors);

  const handleVerificationEmail = async (data: EmailVerificationCodeDto) => {
    const { code } = data;

    const response = await userService.emailVerification(code);

    if (response?.message) {
      setToastRedirection(response.message, "success", "/login");
    }
  };

  const handleNewCode = async () => {
    const response = await userService.getSignupVerificationCode();
    if (response?.message) {
      notify.info(response.message);
      setNewCode(true);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl font-bold">Email verification</h1>
      <form
        onSubmit={handleSubmit(handleVerificationEmail)}
        className="flex flex-col gap-4 w-80"
      >
        <label className="flex flex-col gap-1">
          <span>Code</span>
          <input
            type="text"
            {...register("code")}
            className="input input-bordered"
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary py-2 mt-4 rounded bg-blue-500 text-white"
        >
          Verify
        </button>
      </form>
      <div className="flex gap-4">
        {!newCode ? (
          <button className="btn btn-warning" onClick={handleNewCode}>
            Get a new code
          </button>
        ) : null}
        <SignOutButton />
      </div>
    </div>
  );
}
