import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import { HubPageEnum, IInitialState, SelectedHubEnum } from "./Types";

const initialState: IInitialState = {
  hubs: undefined,
  selectedHubPage: HubPageEnum.LIST,
  selectedHub: SelectedHubEnum.APPROVED,
  selectedHubDetails: undefined,
};

export const Slice = createSlice({
  initialState,
  name: "hub-Slice",
  reducers: Reducer,
});

export { Slice as HubSlice };

export const {
  sethubs,
  setSelectedHubPage,
  setSelectedHub,
  setSelectedHubDetails,
} = Slice.actions;
