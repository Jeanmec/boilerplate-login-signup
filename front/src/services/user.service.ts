import { getRequest, postRequest } from "@/lib/request";
import { TypeCurrentAccount } from "../types/me.t";
import { TypeBasicRequest } from "../types/request.t";

class UserService {
  async getCurrentUser(
    token?: string
  ): Promise<TypeBasicRequest | TypeCurrentAccount> {
    try {
      const endpoint = "/users/me";
      const user = token
        ? await getRequest<TypeCurrentAccount>(endpoint, token)
        : await getRequest<TypeCurrentAccount>(endpoint);

      return user;
    } catch (error) {
      console.error("An error occurred:", error);
      return { message: "An error occurred" };
    }
  }

  async getSignupVerificationCode(): Promise<TypeBasicRequest> {
    try {
      const response = await getRequest<TypeBasicRequest>(
        "/auth/email/verification-code"
      );
      return response;
    } catch (error) {
      console.error("Error fetching signup verification code:", error);
      return { message: "An error occurred" };
    }
  }

  async verifyEmail(code: string): Promise<TypeBasicRequest> {
    try {
      const response = await postRequest<{ code: string }, TypeBasicRequest>(
        "/auth/email/verify",
        { code }
      );
      return response;
    } catch (error) {
      console.error("An error occurred:", error);
      return { message: "An error occurred" };
    }
  }

  async forgotPassword(email: string): Promise<TypeBasicRequest> {
    try {
      const response = await postRequest<{ email: string }, TypeBasicRequest>(
        "/auth/password/forgot",
        { email }
      );
      return response;
    } catch (error) {
      console.error("An error occurred:", error);
      return { message: "An error occurred" };
    }
  }

  async login(email: string, password: string): Promise<TypeBasicRequest> {
    try {
      const response = await postRequest<
        { email: string; password: string },
        TypeBasicRequest
      >("/auth/login", { email, password });
      return response;
    } catch (error) {
      console.error("An error occurred:", error);
      return { message: "An error occurred" };
    }
  }

  async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<TypeBasicRequest> {
    try {
      const response = await postRequest<
        { name: string; email: string; password: string },
        TypeBasicRequest
      >("/auth/signup", { name, email, password });
      return response;
    } catch (error) {
      console.error("An error occurred:", error);
      return { message: "An error occurred" };
    }
  }

  async resetPassword(
    email: string,
    code: string,
    password: string
  ): Promise<TypeBasicRequest> {
    try {
      const response = await postRequest<
        { email: string; code: string; password: string },
        TypeBasicRequest
      >("/auth/password/reset", { email, code, password });
      return response;
    } catch (error) {
      console.error("An error occurred:", error);
      return { message: "An error occurred" };
    }
  }
}

export const userService = new UserService();
