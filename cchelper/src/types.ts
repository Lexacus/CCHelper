export type ClientInfo = {
  name: string;
  id: {
    number: string;
    releaseDate: string;
    expirationDate: string;
    municipality: string;
  };
  fiscalCode: string;
  vatNumber: string;
  birthPlace: string;
  birthDate: string;
  phone: string;
  email: string;
  residence: string;
  activationAddress: string;
  iban: string;
  portabilityNumber: string;
  simInfo: {
    name: string;
    fiscalCode: string;
    id: {
      number: string;
      releaseDate: string;
      expirationDate: string;
      municipality: string;
    };
  };
  coverage: string;
  offer: string;
  requestedDevice: string;
};

export type Toast = { message: string; type?: "error" | "success" };
