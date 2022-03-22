import { combineReducers, Reducer } from "redux";
import { HubSlice } from "../slice/hub-slice/Slice";
import { NavSlice } from "../slice/nav-slice/Slice";
import { PackageSlice } from "../slice/package-slice/Slice";
import { PaymentSlice } from "../slice/payment-slice/Slice";
import { RidersSlice } from "../slice/riders-slice/Slice";
import { SettingSlice } from "../slice/setting-slice/Slice";
import { UserSlice } from "../slice/user-slice/Slice";
import { VehicleSlice } from "../slice/vehicle-slice/Slice";
import { ZoneSlice } from "../slice/zone-slice/Slice";

export interface IRootState {
  packageData: ReturnType<typeof PackageSlice.reducer>;
  userData: ReturnType<typeof UserSlice.reducer>;
  ridersData: ReturnType<typeof RidersSlice.reducer>;
  hubData: ReturnType<typeof HubSlice.reducer>;
  vehicleData: ReturnType<typeof VehicleSlice.reducer>;
  zoneData: ReturnType<typeof ZoneSlice.reducer>;
  navData: ReturnType<typeof NavSlice.reducer>;
  settingData: ReturnType<typeof SettingSlice.reducer>;
  PaymentData: ReturnType<typeof PaymentSlice.reducer>;
}

/**
 * Returns the list of reducers
 */
const createRootReducer: () => Reducer<IRootState> = (): Reducer<IRootState> =>
  combineReducers<IRootState>({
    packageData: PackageSlice.reducer,
    userData: UserSlice.reducer,
    ridersData: RidersSlice.reducer,
    hubData: HubSlice.reducer,
    vehicleData: VehicleSlice.reducer,
    zoneData: ZoneSlice.reducer,
    navData: NavSlice.reducer,
    settingData: SettingSlice.reducer,
    PaymentData: PaymentSlice.reducer,
  });

export default createRootReducer;
