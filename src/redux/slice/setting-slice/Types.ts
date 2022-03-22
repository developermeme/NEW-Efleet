export interface IParcelConfig {
  hubid: string;
  rid: number;
  typeofvehicle: string;
  weight: number;
}

export interface ISubZone {
  id: number;
  sid: number;
  divisionname: string;
  pincode: string;
  zoneid: number;
}

export interface IZone {
  hubid: string;
  id: number;
  sid: number;
  subDivision: ISubZone[];
  zoneid: number;
  zonename: string;
}

export interface IInitialState {
  parcelconfiglist: IParcelConfig[] | undefined;
  ZoneData: IZone | undefined;
  selectedSubZone: ISubZone | null;
}
