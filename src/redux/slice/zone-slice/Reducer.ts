import { PayloadAction } from "@reduxjs/toolkit";
import { ZonePageEnum, IInitialState } from "./Types";

export const Reducer = {
  setSelectedZonePage: (
    state: IInitialState,
    action: PayloadAction<ZonePageEnum>
  ): void => {
    state.SelectedZonePage = action.payload;
  },
};
