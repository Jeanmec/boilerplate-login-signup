"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { setAuthToken } from "@/store/authStore";
import { useToastRedirection } from "@/providers/ToastRedirectionContext";
import { userService } from "@/services/user.service";
import { loginSchema, LoginDto } from "@/validation/auth.validation";
import { useFormErrorNotifier } from "@/hooks/useFormErrorNotifier";

export default function Login() {
  const { setToastRedirection } = useToastRedirection();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  useFormErrorNotifier(errors);

  const onSubmit = async (data: LoginDto) => {
    const { email, password } = data;

    const response = await userService.login(email, password);

    if (response && response.token) {
      setAuthToken(response.token);
      if (response.message) {
        setToastRedirection(response.message, "success", "/");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-5xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-80"
      >
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="email"
            {...register("email")}
            className="input input-bordered"
            autoComplete="email"
          />
        </label>

        <div>
          <label className="flex flex-col gap-1">
            <span>Password</span>
            <input
              type="password"
              {...register("password")}
              className="input input-bordered"
              autoComplete="current-password"
            />
          </label>
          <Link
            href="/login/forgot-password"
            className="underline text-blue-500 mt-2"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="btn btn-primary py-2 mt-4 rounded bg-blue-500 text-white"
        >
          Login
        </button>

        <div className="flex gap-2">
          <span>No account?</span>
          <Link href="/signup" className="underline text-blue-500">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
