export interface IRiderPayments {
  amountpaid: number;
  hubid: string;
  lastpaid: string;
  name: string;
  pending: number;
  riderId: string;
  rpid: number;
}

export interface IInitialState {
  payments: IRiderPayments[] | undefined;
  selectedRiderPayment: IRiderPayments | undefined;
  riderPaymentformula: any[] | undefined;
}
