import { useCallback } from "react";
import { useUIStore } from "../store/ui-store";
import { Toast } from "../types";

export const useToast = () => {
  const { setToast } = useUIStore();
  const showToast = useCallback(
    (toast: Toast) => {
      setToast(toast);
      setTimeout(() => {
        setToast(undefined);
      }, 2000);
    },
    [setToast]
  );

  return showToast;
};
