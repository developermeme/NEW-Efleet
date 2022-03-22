export enum RidersPageEnum {
  Rider_LIST = "list",
  ADD_RIDERS = "add",
  RIDER_DETAIL = "detail",
}

export enum RiderEnum {
  ALL_RIDERS = "All",
  ONLINE_RIDERS = "Online",
  OFFLINE_RIDERS = "Offline",
}

type RiderPropType = string;

export interface IRiderDetail {
  accNumber: RiderPropType;
  adharId: RiderPropType;
  adminUserId: RiderPropType;
  approvedStatus: boolean;
  bankName: RiderPropType;
  bussiness_url: RiderPropType;
  createdAt: RiderPropType;
  emailId: RiderPropType;
  hubAddress1: RiderPropType;
  hubAddress2: RiderPropType;
  hubId: RiderPropType;
  hubLatitute: RiderPropType;
  hubLocation: RiderPropType;
  hubName: RiderPropType;
  ifscCode: RiderPropType;
  imageName: RiderPropType;
  img_url: RiderPropType;
  lastLogintime: RiderPropType;
  otp: number;
  password: RiderPropType;
  phoneNumber: RiderPropType;
  proof_url: RiderPropType;
  rating: RiderPropType;
  riderStatus: RiderPropType;
  role: RiderPropType;
  subscription: RiderPropType;
  taskAllocationStatus: boolean;
  taskLocation: RiderPropType;
  updatedAt: RiderPropType;
  userId: RiderPropType;
  userName: RiderPropType;
  userStatus: boolean;
  validity: RiderPropType;
  vehicleId: RiderPropType;
  vehicleOwned: RiderPropType;
  vehicleType: RiderPropType;
  weight: RiderPropType;
}

export interface ITaskDetails {
  building: string;
  city: string;
  country: string;
  covereddistance: number;
  date: string;
  deliveredBy: string;
  deliverymode: string;
  deliverystatus: string;
  did: number;
  distancefromhub: number;
  earning: number;
  email: string;
  hubid: string;
  instructions: string;
  itemName: string;
  itemPrice: string;
  name: string;
  orderNumber: string;
  postcode: string;
  qty: string;
  scannedurl: string;
  shippingMethod: string;
  signatureRequired: string;
  state: string;
  status: string;
  street: string;
  suburb: string;
  telephone: string;
  useravailability: string;
  weight: number;
}

export interface IEarning {
  [name: string]: string;
}

export interface IInitialState {
  selectedRidersPage: RidersPageEnum;
  selectedRidersView: RiderEnum;
  RidersList: IRiderDetail[] | null;
  selectedRider: IRiderDetail | null;
  TaskDetails: ITaskDetails[] | null;
  earningDetails: IEarning | null;
  transactionDetails: any | null;
}
