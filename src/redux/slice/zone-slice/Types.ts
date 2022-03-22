export enum ZonePageEnum {
  Settings_mainPage = "mainPage",
  Parcel_Configuration = "GetParcel",
  Add_Parcel_Configuration = "AddParcel",
  Get_mainZone = "Getzone",
  Add_mainZone = "AddmainZone",
  Get_Subdivison = "GetSubdivison",
  Add_Subdivison = "AddSubdivison",
}

export interface IZone {
  hubid: string;
  rid: any;
  typeofvehicle: string;
  weight: any;
  divisionname: string;
  pincode: string;
  sid: string;
  zoneid: string;
  zonename: string;
  id: any;
}

export interface IInitialState {
  SelectedZonePage: ZonePageEnum;
  SettingsMainPage: ZonePageEnum;
  Zonelist: IZone[] | undefined;
  SubZonelist: IZone[] | undefined;
  ParceConfigurationlist: IZone[] | undefined;
  SelectedZone: IZone | undefined;
}
