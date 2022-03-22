import { PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IRiderPayments } from "./Types";

export const Reducer = {
  setPayments: (
    state: IInitialState,
    action: PayloadAction<Array<IRiderPayments>>
  ): void => {
    state.payments = action.payload;
  },
  setSelectedRiderPayment: (
    state: IInitialState,
    action: PayloadAction<IRiderPayments>
  ): void => {
    state.selectedRiderPayment = action.payload;
  },
  setRiderPaymentFormula: (
    state: IInitialState,
    action: PayloadAction<Array<any>>
  ): void => {
    state.riderPaymentformula = action.payload;
  },
};
