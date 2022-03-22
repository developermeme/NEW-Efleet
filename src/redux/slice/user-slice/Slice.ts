import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import { IInitialState } from "./Types";

const initialState: IInitialState = {
  UserCredentials: undefined,
  hubCredentials: undefined,
  docsCredentials: undefined,
  countryCode: undefined,
};

export const Slice = createSlice({
  initialState,
  name: "user-Slice",
  reducers: Reducer,
});

export { Slice as UserSlice };

export const { setUserData, setHubData, setDocsData, setCountryCode } =
  Slice.actions;
