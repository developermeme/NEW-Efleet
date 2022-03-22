import { PayloadAction } from "@reduxjs/toolkit";
import { IHub, IInitialState, SelectedHubEnum, HubPageEnum } from "./Types";

export const Reducer = {
  sethubs: (state: IInitialState, action: PayloadAction<Array<IHub>>): void => {
    state.hubs = action.payload;
  },
  setSelectedHubPage: (
    state: IInitialState,
    action: PayloadAction<HubPageEnum>
  ): void => {
    state.selectedHubPage = action.payload;
  },
  setSelectedHub: (
    state: IInitialState,
    action: PayloadAction<SelectedHubEnum>
  ): void => {
    state.selectedHub = action.payload;
  },
  setSelectedHubDetails: (
    state: IInitialState,
    action: PayloadAction<IHub>
  ): void => {
    state.selectedHubDetails = action.payload;
  },
};
