import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import { IInitialState } from "./Types";

const initialState: IInitialState = {
  payments: undefined,
  selectedRiderPayment: undefined,
  riderPaymentformula: undefined,
};

export const Slice = createSlice({
  initialState,
  name: "hub-Slice",
  reducers: Reducer,
});

export { Slice as PaymentSlice };

export const { setPayments, setSelectedRiderPayment, setRiderPaymentFormula } =
  Slice.actions;
