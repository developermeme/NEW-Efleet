import { PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IParcelConfig, IZone, ISubZone } from "./Types";

export const Reducer = {
  setParcelconfiglist: (
    state: IInitialState,
    action: PayloadAction<IParcelConfig[]>
  ): void => {
    state.parcelconfiglist = action.payload;
  },
  setZoneData: (state: IInitialState, action: PayloadAction<IZone>): void => {
    state.ZoneData = action.payload;
  },
  setSelectedSubZone: (
    state: IInitialState,
    action: PayloadAction<ISubZone | null>
  ): void => {
    state.selectedSubZone = action.payload;
  },
};
