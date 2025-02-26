import { useEffect } from "react";
import { FieldErrors } from "react-hook-form";
import { notify } from "@/lib/toastService";

export function useFormErrorNotifier(errors: FieldErrors) {
  useEffect(() => {
    const firstError = Object.values(errors)[0];
    if (typeof firstError?.message === "string") {
      notify.error(firstError.message);
    }
  }, [errors]);
}
