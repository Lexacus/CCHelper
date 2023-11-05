import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { Input } from "./common/Input";
import { ClientInfo } from "../types";
import { FC, useEffect } from "react";
import { useClientStore } from "../store/clientStore";
import { shallow } from "zustand/shallow";
import { Button } from "./common/Button";

export const ClientModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useFormContext<ClientInfo>();
  const { clients, setClients } = useClientStore(
    ({ clients, setClients }) => ({ clients, setClients }),
    shallow
  );

  const onSubmit: SubmitHandler<ClientInfo> = (data) => {
    console.log(data);
    const newClients = clients?.filter(
      ({ fiscalCode }) => fiscalCode !== data.fiscalCode
    );
    setClients([...(newClients ?? []), data]);
  };

  const onError: SubmitErrorHandler<ClientInfo> = (data) => {
    /*     if (data.fiscalCode.) {
      setError("fiscalCode", )
    } */
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full z-5 bg-[white] ">
      <form
        className="relative flex flex-col max-w-full h-full "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="fixed bg-white border-b border-blue-800 flex w-full cursor-pointer justify-end pr-[30px] gap-[10px] py-[10px]">
          <Button>Salva cliente</Button>
          <Button type="button" onClick={onClose}>
            Chiudi
          </Button>
        </div>
        <div className="flex flex-col flex-wrap w-full h-[100%] pb-[20px] items-center gap-y-[5px] mt-[50px]">
          <Input
            label="Nome intestatario / Ragione sociale"
            {...register("name")}
          />
          <div className="flex flex-col gap-x-[5px] border-[1px] p-[5px] ">
            <span className="text-[18px]">Carta d'identità</span>
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
          </div>
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
          <div className="flex flex-col gap-x-[5px] border-[1px] p-[5px] ">
            <span className="text-[18px]">Informazioni intestatario SIM</span>
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
          </div>
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
