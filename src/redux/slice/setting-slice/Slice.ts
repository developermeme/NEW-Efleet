import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import { IInitialState } from "./Types";

const initialState: IInitialState = {
  parcelconfiglist: undefined,
  ZoneData: undefined,
  selectedSubZone: null,
};

export const Slice = createSlice({
  initialState,
  name: "setting-Slice",
  reducers: Reducer,
});

export { Slice as SettingSlice };

export const { setParcelconfiglist, setZoneData, setSelectedSubZone } =
  Slice.actions;
