import { useFormContext } from "react-hook-form";
import { Input } from "./common/Input";
import { ClientInfo } from "../types";
import { FC } from "react";

export const ClientModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { register, handleSubmit } = useFormContext<ClientInfo>();
  return (
    <div className="absolute top-0 left-0 w-full h-full z-5 bg-[white]">
      <div
        className="cursor pointer"
        onClick={() => {
          onClose();
        }}
      >
        X
      </div>
      <form
        className="flex flex-col w-full h-full items-center border-[1px] border-[green] gap-y-[5px]"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <Input
          label="Nome intestatario / Ragione sociale"
          {...register("name")}
        />
        <div className="flex flex-col gap-x-[5px] border-[1px] p-[5px] ">
          <span>Carta d'identità</span>
          <div className="flex flex-row gap-x-[5px]">
            <Input label="Numero" {...register("id.number")} />
            <Input label="Data di rilascio" {...register("id.releaseDate")} />
          </div>
          <div className="flex flex-row gap-x-[5px]">
            <Input
              label="Data di scadenza"
              {...register("id.expirationDate")}
            />
            <Input
              label="Comune di rilascio"
              {...register("id.municipality")}
            />
          </div>
        </div>
        <Input label="Codice fiscale" {...register("fiscalCode")} />
        <Input label="Partita IVA" {...register("vatNumber")} />
        <Input label="Luogo di nascita" {...register("birthPlace")} />
        <Input label="Data di nascita" {...register("birthDate")} />
        <Input label="Numero cellulare per OTP" {...register("phone")} />
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
          <span>Informazioni intestatario SIM</span>
          <div className="flex flex-row gap-x-[5px]">
            <Input
              label="Gestore/Intestatario SIM"
              {...register("simInfo.name")}
            />
            <Input label="Codice fiscale" {...register("simInfo.fiscalCode")} />
          </div>
          <div className="flex flex-row gap-x-[5px]">
            <Input label="Numero" {...register("simInfo.id.number")} />
            <Input
              label="Data di rilascio"
              {...register("simInfo.id.releaseDate")}
            />
          </div>
          <div className="flex flex-row gap-x-[5px]">
            <Input
              label="Data di scadenza"
              {...register("simInfo.id.expirationDate")}
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
        <button>Submit</button>
      </form>
    </div>
  );
};
