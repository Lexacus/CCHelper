import { FormProvider, useForm } from "react-hook-form";
import { ClientInfo } from "./types";
import { ClientModal } from "./components/ClientModal";
import { useMemo, useState } from "react";
import { Input } from "./components/common/Input";
import { useClientStore } from "./store/client-store";
import { shallow } from "zustand/shallow";
import { Button } from "./components/common/Button";
import { useUIStore } from "./store/ui-store";
import { cn } from "./utils";

const App = () => {
  const { toast } = useUIStore(({ toast }) => ({ toast }));
  const { clients } = useClientStore(({ clients }) => ({ clients }), shallow);
  const [clientModalOpen, setClientModalOpen] = useState<boolean>(false);
  const methods = useForm<ClientInfo>();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const filteredClients = useMemo(() => {
    if (!clients) {
      return [];
    }
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        client.phone?.includes(searchFilter)
    );
  }, [searchFilter, clients]);

  return (
    <>
      {toast && (
        <div className="fixed flex justify-center items-center border w-full h-fit bottom-[50px] left-0 z-[10]">
          <span
            className={cn(
              "text-[20px] w-fit px-[5px] rounded-[3px]",
              toast.type === "error" ? "bg-red-600" : "bg-green-400"
            )}
          >
            {toast.message}
          </span>
        </div>
      )}
      <div className="flex w-full h-full justify-center">
        <FormProvider {...methods}>
          <div className="flex flex-col w-full max-w-[500px] items-center gap-y-[10px]">
            <Button
              onClick={() => {
                setClientModalOpen(true);
                methods.reset({ name: "" });
              }}
            >
              Aggiungi cliente
            </Button>
            <Input
              label="Cerca cliente"
              placeholder="Nome, cognome o numero"
              onChange={({ currentTarget }) => {
                setSearchFilter(currentTarget.value);
              }}
            />
            <table className="w-full border">
              <thead className="flex border-b">
                <td className="flex flex-[1] justify-center items-center border-r">
                  Nome e cognome
                </td>
                <td className="flex flex-[1] justify-center items-center">
                  Telefono
                </td>
              </thead>
              {filteredClients.map((client) => {
                return (
                  <tr
                    className="w-full cursor-pointer flex border-b hover:bg-blue-100"
                    onClick={() => {
                      setClientModalOpen(true);
                      methods.reset(client);
                    }}
                  >
                    <td className="flex flex-[1] justify-center w-full border-r">
                      {client.name}
                    </td>
                    <td className="flex flex-[1] justify-center w-full">
                      {client.phone ?? "Non inserito"}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          {clientModalOpen && (
            <ClientModal
              onClose={() => {
                setClientModalOpen(false);
              }}
            />
          )}
        </FormProvider>
      </div>
    </>
  );
};

export default App;
