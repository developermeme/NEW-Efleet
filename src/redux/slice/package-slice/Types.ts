export interface IFileData {
  building: string;
  city: string;
  country: string;
  date: string;
  deliveredBy: string;
  deliverymode: string;
  did: number;
  email: string;
  hubid: any;
  instructions: string;
  itemName: string;
  itemPrice: string;
  name: any;
  orderNumber: string;
  postcode: string;
  qty: string;
  shippingMethod: string;
  signatureRequired: string;
  state: string;
  status: string;
  street: string;
  suburb: string;
  telephone: string;
  weight: number;
}

export interface IPack {
  building: string;
  city: string;
  country: string;
  date: string;
  deliveredBy: string;
  deliverymode: string;
  did: number;
  email: string;
  hubid: any;
  instructions: string;
  itemName: string;
  itemPrice: string;
  name: string;
  orderNumber: string;
  postcode: string;
  qty: string;
  shippingMethod: string;
  signatureRequired: string;
  state: string;
  status: string;
  street: string;
  suburb: string;
  telephone: string;
  weight: number;
}

export interface IPackages {
  [name: string]: IPack[];
}

export enum TaskPageEnum {
  List = 1,
  Item = 2,
}

export interface ISelectedRegion {
  name: string;
  packages: IPack[];
  riders: number;
}

export interface IRider {
  adharId: string;
  adminUserId: string;
  createdAt: string;
  emailId: string;
  hubId: string;
  hubName: string;
  imageName: string;
  lastLogintime: string;
  otp: string;
  password: string;
  phoneNumber: string;
  rating: string;
  riderStatus: string;
  taskAllocationStatus: string;
  role: string;
  updatedAt: string;
  userId: string;
  userName: string;
  vehicleId: any;
  userStatus: string;
  vehicleOwned: string;
  vehicleType: string;
  weight: string;
}

export interface IAllocatedRiders {
  assignid?: number;
  hubid: any;
  riderid: string;
  ridername: string;
  subdivision: string;
  typeofvehicle: string;
  weight: number;
}

export interface IInitialState {
  FileData: IFileData[] | null;
  Packages: IPackages | null;
  TaskAllocationView: TaskPageEnum;
  SelectedRegion: ISelectedRegion | null;
  AllocatedRiders: IAllocatedRiders[] | null;
  Riders: IRider[] | null;
  AssignedRiders: IRider[] | null;
}
