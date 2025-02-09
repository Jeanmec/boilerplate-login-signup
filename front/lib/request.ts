import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { notify } from "@/lib/toastService";

const request = axios.create({
  baseURL: process.env.API_URL,
  // timeout: 1000, // Délai d'attente de 10 secondes
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
};

export const postRequest = async <T, R>(url: string, data: T): Promise<R> => {
  try {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const response: AxiosResponse<R> = await request.post(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        data
      );
      return response.data;
    }
  } catch (error) {
    showToastError(error);
    throw error;
  }
};

export const putRequest = async <T, R>(
  url: string,
  data: T,
  config?: AxiosRequestConfig
): Promise<R> => {
  try {
    const response: AxiosResponse<R> = await request.put(url, data, config);
    return response.data;
  } catch (error) {
    console.error("Erreur PUT:", error);
    throw error;
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

// Fonction pour la requête DELETE
export const deleteRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await request.delete(url, config);
    return response.data;
  } catch (error) {
    console.error("Erreur DELETE:", error);
    throw error;
  }
};

export default request;
