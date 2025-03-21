"use client";
import { useForm } from "react-hook-form";
import { useToastRedirection } from "@/providers/ToastRedirectionContext";
import { userService } from "@/services/user.service";
import { setAuthToken } from "@/store/authStore";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormErrorNotifier } from "@/hooks/useFormErrorNotifier";
import { signUpSchema, SignUpDto } from "@/validation/auth.validation";

export default function SignUp() {
  const { setToastRedirection } = useToastRedirection();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDto>({
    resolver: zodResolver(signUpSchema),
  });

  useFormErrorNotifier(errors);

  const handleSignUp = async (data: SignUpDto) => {
    const { name, email, password } = data;

    const response = await userService.signUp(name, email, password);

    if (response && response.token) {
      setAuthToken(response.token);

      if (response.message) {
        setToastRedirection(
          response.message,
          "info",
          "/signup/email-verification"
        );
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl font-bold">Sign up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(handleSignUp)();
        }}
        className="flex flex-col gap-4 w-80"
      >
        <label className="flex flex-col gap-1">
          <span>Name</span>
          <input
            type="text"
            {...register("name")}
            className="input input-bordered"
            autoComplete="username"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="email"
            {...register("email")}
            className="input input-bordered"
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Password</span>
          <input
            type="password"
            {...register("password")}
            className="input input-bordered"
            autoComplete="new-password"
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary py-2 mt-4 rounded bg-blue-500 text-white"
        >
          Sign up
        </button>
        <div className="flex gap-2">
          <span>Already have an account?</span>
          <Link href="/login" className="underline text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
