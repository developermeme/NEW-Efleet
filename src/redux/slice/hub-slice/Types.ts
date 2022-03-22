export interface IHub {
  userId: string;
  userName: string;
  emailId: string;
  role: string;
  phoneNumber: string;
  lastLogintime: any;
  password: string;
  adharId: string;
  imageName: string;
  hubName: string;
  adminUserId: any;
  taskAllocationStatus: any;
  taskLocation: string;
  vehicleId: any;
  rating: any;
  otp: number;
  vehicleOwned: string;
  vehicleType: string;
  riderStatus: string;
  userStatus: string;
  hubId: string;
  weight: any;
  bankName: string;
  accNumber: string;
  ifscCode: string;
  approvedStatus: boolean;
  subscription: string;
  validity: string;
  proof_url: string;
  img_url: string;
  bussiness_url: string;
  hubLocation: string;
  hubAddress1: string;
  hubAddress2: string;
  hubLatitute: string;
  hubLongitude: string;
  createdAt: string;
  updatedAt: string;
}

export enum SelectedHubEnum {
  APPROVED = "approve",
  REQUESTED = "reject",
}

export enum HubPageEnum {
  LIST = "list",
  DETAILS = "details",
  RIDERS = "riders",
}

export interface IInitialState {
  hubs: IHub[] | undefined;
  selectedHubPage: HubPageEnum;
  selectedHub: SelectedHubEnum;
  selectedHubDetails: IHub | undefined;
}
