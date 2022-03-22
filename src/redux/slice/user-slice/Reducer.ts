import { PayloadAction } from "@reduxjs/toolkit";
import {
  IInitialState,
  IuserRegister,
  IHubRegister,
  IDocsRegister,
} from "./Types";

export const Reducer = {
  setUserData: (
    state: IInitialState,
    action: PayloadAction<IuserRegister>
  ): void => {
    state.UserCredentials = action.payload;
  },
  setHubData: (
    state: IInitialState,
    action: PayloadAction<IHubRegister>
  ): void => {
    state.hubCredentials = action.payload;
  },
  setDocsData: (
    state: IInitialState,
    action: PayloadAction<IDocsRegister>
  ): void => {
    state.docsCredentials = action.payload;
  },
  setCountryCode: (state: IInitialState, action: PayloadAction<string>): void => {
    state.countryCode = action.payload;
  },
};
