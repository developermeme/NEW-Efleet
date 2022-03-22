import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import { IInitialState, VehiclePageEnum } from "./Types";

const initialState: IInitialState = {
  selectedVehiclePage: VehiclePageEnum.VEHICLE_LIST,
  vehicleList: undefined,
  selectedFilters: null,
  selectedVehicle: undefined,
};

export const Slice = createSlice({
  initialState,
  name: "vehicle-Slice",
  reducers: Reducer,
});

export { Slice as VehicleSlice };

export const {
  setSelectedVehiclePage,
  setVehicleList,
  setVehicleFilters,
  setSelectedVehicle,
} = Slice.actions;
