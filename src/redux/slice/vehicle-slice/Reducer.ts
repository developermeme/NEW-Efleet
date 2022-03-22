import { PayloadAction } from "@reduxjs/toolkit";

import {
  VehiclePageEnum,
  IVehicle,
  IInitialState,
  IVehicleFilters,
} from "./Types";

export const Reducer = {
  setSelectedVehiclePage: (
    state: IInitialState,
    action: PayloadAction<VehiclePageEnum>
  ): void => {
    state.selectedVehiclePage = action.payload;
  },
  setVehicleList: (
    state: IInitialState,
    action: PayloadAction<Array<IVehicle>>
  ): void => {
    state.vehicleList = action.payload;
  },
  setVehicleFilters: (
    state: IInitialState,
    action: PayloadAction<{ [key: string]: string[] | string }>
  ): void => {
    const { key, value } = action.payload as any;
    let newState = state.selectedFilters || ({} as IVehicleFilters);
    newState = {
      ...newState,
      [key]: value,
    };
    state.selectedFilters = newState;
  },
  setSelectedVehicle: (
    state: IInitialState,
    action: PayloadAction<IVehicle>
  ): void => {
    state.selectedVehicle = action.payload;
  },
};
