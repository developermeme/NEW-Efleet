import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import { IInitialState, RiderEnum, RidersPageEnum } from "./Types";

const initialState: IInitialState = {
  selectedRidersPage: RidersPageEnum.Rider_LIST,
  selectedRidersView: RiderEnum.ALL_RIDERS,
  RidersList: null,
  selectedRider: null,
  transactionDetails: null,
  TaskDetails: null,
  earningDetails: null,
};

export const Slice = createSlice({
  initialState,
  name: "riders-Slice",
  reducers: Reducer,
});

export { Slice as RidersSlice };

export const {
  setSelectedRidersPage,
  setSelectedRidersView,
  setRidersList,
  setSelectedRider,
  setTaskDetails,
  setEarningDetails,
  setTransactionDetails,
} = Slice.actions;
