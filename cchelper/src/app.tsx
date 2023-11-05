import { FormProvider, useForm } from "react-hook-form";
import { ClientInfo } from "./types";
import { ClientModal } from "./components/ClientModal";
import { useMemo, useState } from "react";
import { Input } from "./components/common/Input";
import { useClientStore } from "./store/clientStore";
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
    return clients.filter((client) => client.name.includes(searchFilter));
  }, [searchFilter, clients]);

  return (
    <div className="flex w-full h-full justify-center">
      <FormProvider {...methods}>
        <div className="flex flex-col w-full max-w-[500px] border-[1px] border-[blue]">
          <Button
            onClick={() => {
              setClientModalOpen(true);
              methods.reset();
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
          {filteredClients.map((client) => {
            return (
              <div
                className="cursor-pointer"
                onClick={() => {
                  console.log(client);
                  setClientModalOpen(true);
                  methods.reset(client);
                }}
              >
                {client.name}
              </div>
            );
          })}
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
