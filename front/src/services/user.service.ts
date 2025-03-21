import { getRequest, postRequest } from "@/lib/request";
import { TypeCurrentAccount } from "../types/me.t";
import { TypeBasicRequest } from "../types/request.t";
import {
  EmailVerificationCodeDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignUpDto,
} from "@/validation/auth.validation";

class UserService {
  async getCurrentUser(
    token?: string
  ): Promise<TypeBasicRequest | TypeCurrentAccount> {
    const endpoint = "/users/me";
    const user = token
      ? await getRequest<TypeCurrentAccount>(endpoint, token)
      : await getRequest<TypeCurrentAccount>(endpoint);

    return user;
  }

  async getSignupVerificationCode(): Promise<TypeBasicRequest> {
    return await getRequest<TypeBasicRequest>("/auth/email/verification-code");
  }

  async emailVerification(code: string): Promise<TypeBasicRequest> {
    const response = await postRequest<
      EmailVerificationCodeDto,
      TypeBasicRequest
    >("/auth/email/verify", { code });
    return response;
  }

  async forgotPassword(email: string): Promise<TypeBasicRequest> {
    return await postRequest<ForgotPasswordDto, TypeBasicRequest>(
      "/auth/password/forgot",
      { email }
    );
  }

  async login(email: string, password: string): Promise<TypeBasicRequest> {
    return await postRequest<LoginDto, TypeBasicRequest>("/auth/login", {
      email,
      password,
    });
  }

  async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<TypeBasicRequest> {
    return await postRequest<SignUpDto, TypeBasicRequest>("/auth/signup", {
      name,
      email,
      password,
    });
  }

  async resetPassword(
    email: string,
    code: string,
    password: string
  ): Promise<TypeBasicRequest> {
    return await postRequest<ResetPasswordDto, TypeBasicRequest>(
      "/auth/password/reset",
      { email, code, password }
    );
  }
}

export const userService = new UserService();
