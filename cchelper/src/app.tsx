import { FormProvider, useForm } from "react-hook-form";
import { ClientInfo } from "./types";
import { ClientModal } from "./components/ClientModal";
import { useMemo, useState } from "react";
import { Input } from "./components/common/Input";

const clients = [{ name: "Mario Rossi" }, { name: "Luigi Verdi" }];

const App = () => {
  const methods = useForm<ClientInfo>();
  const [selectedClient, setSelectedClient] = useState<string>();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const filteredClients = useMemo(() => {
    return clients.filter((client) => client.name.includes(searchFilter));
  }, [searchFilter]);

  return (
    <div className="w-full h-full justify-center">
      <FormProvider {...methods}>
        <div className="flex flex-col max-w-[500px] border-[1px] border-[blue]">
          <Input
            label="Cerca cliente"
            placeholder="Nome, cognome o numero"
            onChange={({ currentTarget }) => {
              setSearchFilter(currentTarget.value);
            }}
          />
          {filteredClients.map((client) => {
            return (
              <div onClick={() => setSelectedClient(client.name)}>
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
