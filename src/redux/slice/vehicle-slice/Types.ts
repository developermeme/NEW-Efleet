export enum VehiclePageEnum {
  VEHICLE_LIST = "list",
  ADD_VEHICLE = "add",
  VEHICLE_DETAIL = "detail",
}

export interface IVehicle {
  IOTNumber: null;
  QRCode: null;
  QRCodeString: null;
  adminUserId: null;
  baseExtendPrice: null;
  battery: null;
  batteryType: null;
  brand: null;
  chassisNumber: string;
  city: null;
  createdAt: string;
  currentLocation: null;
  destinationLocation: null;
  extraHelmetPrice: null;
  hubName: string;
  image: null;
  isActive: null;
  model: number;
  motorCapacity: null;
  oldLocation: null;
  perKilometerPrice: null;
  perMinutePrice: null;
  pricingType: null;
  reg_No: string;
  seats: null;
  speed_Limit: string;
  station: null;
  transmission: null;
  updatedAt: string;
  userId: null;
  vehicleId: string;
  vehicleNumber: null;
  vehicleStatus: string;
  vehicleTrackingId: null;
  vehicleType: string;
  weekdayExcessPrice: null;
  weekdayExtendPrice: null;
  weekdayPrice: null;
  weekendExcessPrice: null;
  weekendExtendPrice: null;
  weekendPrice: null;
  xFactorPrice: null;
}

export interface IVehicleFilters {
  type: string[];
  status: string[];
}

export interface IInitialState {
  selectedVehiclePage: VehiclePageEnum;
  vehicleList: IVehicle[] | undefined;
  selectedFilters: IVehicleFilters | null;
  selectedVehicle: IVehicle | undefined;
}
