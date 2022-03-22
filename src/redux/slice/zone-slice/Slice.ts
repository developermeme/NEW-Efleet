import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import { ZonePageEnum, IInitialState } from "./Types";

const initialState: IInitialState = {
  SelectedZonePage: ZonePageEnum.Get_mainZone,
  SettingsMainPage: ZonePageEnum.Settings_mainPage,
  Zonelist: undefined,
  SubZonelist: undefined,
  ParceConfigurationlist: undefined,
  SelectedZone: undefined,
};
export const Slice = createSlice({
  initialState,
  name: "zone-Slice",
  reducers: Reducer,
});
export { Slice as ZoneSlice };

export const { setSelectedZonePage } = Slice.actions;
