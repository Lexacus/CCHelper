import { FormProvider, useForm } from "react-hook-form";
import { ClientInfo } from "./types";
import { ClientModal } from "./components/ClientModal";
import { useMemo, useState } from "react";
import { Input } from "./components/common/Input";
import { useClientStore } from "./store/client-store";
import { shallow } from "zustand/shallow";
import { Button } from "./components/common/Button";

const App = () => {
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
  );
};

export default App;
