import { persist } from "zustand/middleware";
import { ClientInfo } from "../types";
import { create } from "zustand";
/* import { createWithEqualityFn } from "zustand/traditional"; */

type ClientStoreType = {
  clients?: ClientInfo[];
  setClients: (clients: ClientInfo[]) => void;
};

export const useClientStore = create<ClientStoreType>()(
  persist(
    (set) => ({
      clients: [],
      setClients: (clients) => set({ clients }),
    }),
    {
      name: "client-storage", // name of the item in the storage (must be unique)
    }
  )
);
