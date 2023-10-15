import { FormProvider, useForm } from "react-hook-form";
import { ClientInfo } from "./types";
import { ClientModal } from "./components/ClientModal";
import { useMemo, useState } from "react";
import { Input } from "./components/common/Input";
import { useClientStore } from "./store/clientStore";
import { shallow } from "zustand/shallow";

const App = () => {
  const { clients } = useClientStore(({ clients }) => ({ clients }), shallow);
  const methods = useForm<ClientInfo>();
  const [selectedClient, setSelectedClient] = useState<Partial<ClientInfo>>();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const filteredClients = useMemo(() => {
    if (!clients) {
      return [];
    }
    return clients.filter((client) => client.name.includes(searchFilter));
  }, [searchFilter, clients]);

  return (
    <div className="w-full h-full justify-center">
      <FormProvider {...methods}>
        <div className="flex flex-col max-w-[500px] border-[1px] border-[blue]">
          <button
            onClick={() => {
              setSelectedClient({});
            }}
          >
            Aggiungi cliente
          </button>
          <Input
            label="Cerca cliente"
            placeholder="Nome, cognome o numero"
            onChange={({ currentTarget }) => {
              setSearchFilter(currentTarget.value);
            }}
          />
          {filteredClients.map((client) => {
            return (
              <div
                className="cursor-pointer"
                onClick={() => setSelectedClient(client)}
              >
                {client.name}
              </div>
            );
          })}
        </div>
        {selectedClient && (
          <ClientModal
            onClose={() => {
              setSelectedClient(undefined);
            }}
          />
        )}
      </FormProvider>
    </div>
  );
};

export default App;
