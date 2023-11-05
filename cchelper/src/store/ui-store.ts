import { createWithEqualityFn } from "zustand/traditional";
import { Toast } from "../types";

type UIStore = {
  toast?: Toast;
  setToast: (toast?: Toast) => void;
};

export const useUIStore = createWithEqualityFn<UIStore>((set) => ({
  toast: undefined,
  setToast: (toast) => set({ toast }),
}));
