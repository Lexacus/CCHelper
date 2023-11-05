import { FC } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { shallow } from "zustand/shallow";
import { useClientStore } from "../store/client-store";
import { ClientInfo } from "../types";
import { Button } from "./common/Button";
import { Input } from "./common/Input";
import { Accordion } from "./form/Accordion";
import { useToast } from "../hooks/useToast";

export const ClientModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ClientInfo>();
  const { clients, setClients } = useClientStore(
    ({ clients, setClients }) => ({ clients, setClients }),
    shallow
  );
  const showToast = useToast();

  const onSubmit: SubmitHandler<ClientInfo> = (data) => {
    const newClients = clients?.filter(
      ({ fiscalCode }) => fiscalCode !== data.fiscalCode
    );
    setClients([...(newClients ?? []), data]);
    showToast({ message: "CLIENTE SALVATO" });
  };

  const onError: SubmitErrorHandler<ClientInfo> = (data) => {
    if (data.fiscalCode) {
      showToast({ message: "INSERIRE CODICE FISCALE", type: "error" });
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full z-5 bg-blue-100 ">
      <form
        className="relative flex flex-col max-w-full h-full "
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="fixed bg-white border-b border-blue-800 flex w-full cursor-pointer justify-end pr-[30px] gap-[10px] py-[10px]">
          <Button>Salva cliente</Button>
          <Button type="button" onClick={onClose}>
            Chiudi
          </Button>
        </div>
        <div className="flex flex-col flex-wrap w-full h-[100%] pb-[20px] items-left gap-y-[5px] mt-[50px] px-[20px]">
          <Input
            label="Nome intestatario / Ragione sociale"
            {...register("name")}
          />
          <Accordion title="Carta d'identità">
            <div className="flex flex-row gap-x-[5px]">
              <Input label="Numero" {...register("id.number")} />
              <Input
                type="date"
                label="Data di rilascio"
                {...register("id.releaseDate")}
              />
            </div>
            <div className="flex flex-row gap-x-[5px]">
              <Input
                label="Data di scadenza"
                {...register("id.expirationDate")}
                type="date"
              />
              <Input
                label="Comune di rilascio"
                {...register("id.municipality")}
              />
            </div>
          </Accordion>
          <Input
            label="Codice fiscale"
            {...register("fiscalCode", { required: true })}
            error={errors.fiscalCode}
          />
          <Input label="Partita IVA" {...register("vatNumber")} />
          <Input label="Luogo di nascita" {...register("birthPlace")} />
          <Input
            label="Data di nascita"
            {...register("birthDate")}
            type="date"
          />
          <Input
            label="Numero cellulare per OTP"
            {...register("phone")}
            type="tel"
          />
          <Input label="Email" {...register("email")} />
          <Input
            label="Residenza intestatario P.IVA"
            {...register("residence")}
          />
          <Input
            label="Indirizzo attivazione linea"
            {...register("activationAddress")}
          />
          <Input label="IBAN" {...register("iban")} />
          <Input
            label="Numero da portare in TIM"
            {...register("portabilityNumber")}
          />
          <Accordion title="Informazioni intestatario SIM">
            <div className="flex flex-row gap-x-[5px]">
              <Input
                label="Gestore/Intestatario SIM"
                {...register("simInfo.name")}
              />
              <Input
                label="Codice fiscale"
                {...register("simInfo.fiscalCode")}
              />
            </div>
            <div className="flex flex-row gap-x-[5px]">
              <Input label="Numero" {...register("simInfo.id.number")} />
              <Input
                label="Data di rilascio"
                {...register("simInfo.id.releaseDate")}
                type="date"
              />
            </div>
            <div className="flex flex-row gap-x-[5px]">
              <Input
                label="Data di scadenza"
                {...register("simInfo.id.expirationDate")}
                type="date"
              />
              <Input
                label="Comune di rilascio"
                {...register("simInfo.id.municipality")}
              />
            </div>
          </Accordion>
          <Input label="Copertura" {...register("coverage")} />
          <Input label="Offerta" {...register("offer")} />
          <Input
            label="Cellulare (se vuole device)"
            {...register("requestedDevice")}
          />
        </div>
      </form>
    </div>
  );
};
