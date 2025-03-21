import axios, { AxiosResponse, AxiosError } from "axios";
import { notify } from "@/lib/toastService";

const request = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postRequest = async <T, R>(url: string, data: T): Promise<R> => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("API URL is not defined");
    }

    const response: AxiosResponse<R> = await request.post(
      `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      data
    );

    return response.data;
  } catch (error) {
    showToastError(error as AxiosError<{ message: string[] }>);
    throw new Error("An error occurred: " + error);
  }
};

export const getRequest = async <T>(
  url: string,
  token?: string
): Promise<T> => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("API URL is not defined");
    }

    const response: AxiosResponse<T> = await request.get(
      `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    );

    return response.data;
  } catch (error) {
    showToastError(error as AxiosError<{ message: string[] }>);
    throw new Error("An error occurred: " + error);
  }
};

const showToastError = (errors: AxiosError<{ message: string[] }>) => {
  if (errors?.response?.data?.message) {
    if (Array.isArray(errors.response.data.message)) {
      errors.response.data.message.forEach((error: string) => {
        notify.error(error);
      });
    } else {
      notify.error(errors.response.data.message);
    }
  }
};

export default request;
