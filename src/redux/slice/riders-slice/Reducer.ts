import { PayloadAction } from "@reduxjs/toolkit";
import {
  IEarning,
  IInitialState,
  IRiderDetail,
  ITaskDetails,
  RiderEnum,
  RidersPageEnum,
} from "./Types";

export const Reducer = {
  setSelectedRidersPage: (
    state: IInitialState,
    action: PayloadAction<RidersPageEnum>
  ): void => {
    state.selectedRidersPage = action.payload;
  },
  setTransactionDetails: (
    state: IInitialState,
    action: PayloadAction<any>
  ): void => {
    state.transactionDetails = action.payload;
  },
  setSelectedRidersView: (
    state: IInitialState,
    action: PayloadAction<RiderEnum>
  ): void => {
    state.selectedRidersView = action.payload;
  },
  setRidersList: (
    state: IInitialState,
    action: PayloadAction<Array<IRiderDetail>>
  ): void => {
    state.RidersList = action.payload;
  },
  setSelectedRider: (
    state: IInitialState,
    action: PayloadAction<IRiderDetail>
  ): void => {
    state.selectedRider = action.payload;
  },
  setTaskDetails: (
    state: IInitialState,
    action: PayloadAction<ITaskDetails[]>
  ): void => {
    state.TaskDetails = action.payload;
  },
  setEarningDetails: (
    state: IInitialState,
    action: PayloadAction<IEarning>
  ): void => {
    state.earningDetails = action.payload;
  },
};
