export interface IuserRegister {
  userName: string | undefined;
  emailId: string | undefined;
  phoneNumber: string | undefined;
  country: string | undefined;
  role: string | undefined;
  hubName: string | undefined;
}

export interface IHubRegister {
  city: string | undefined;
  hubLocation: string | undefined;
  hubAddress1: string | undefined;
  hubAddress2: string | undefined;
  hubzipCode: string | undefined;
}

export type File = {
  name: string;
  lastModified: number;
  size: number;
  type: string;
};

export interface IDocsRegister {
  idProof: File | undefined;
  bussinessCertificate: File | undefined;
  hubProof: File | undefined;
}

export interface IInitialState {
  UserCredentials: undefined | IuserRegister;
  hubCredentials: undefined | IHubRegister;
  docsCredentials: undefined | IDocsRegister;
  countryCode: undefined | string;
}
