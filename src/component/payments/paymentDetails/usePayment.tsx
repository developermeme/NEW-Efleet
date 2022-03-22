import axios from "axios";

import { Parcel_Configuration } from "../../../util/configFile";
import {
  useError,
  usePageLoader,
  useStorageValues,
} from "../../../hooks/Index";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../redux/reducer/CombineReducer";

import { formatDate } from "../../../helper/Script";
import { IRiderPayments } from "../../../redux/slice/payment-slice/Types";
import {
  setPayments,
  setSelectedRiderPayment,
} from "../../../redux/slice/payment-slice/Slice";

function usePayment() {
  const { LoginHubid } = useStorageValues();
  const [loader, showLoader, hideLoader] = usePageLoader() as any;
  const [error, showError] = useError() as any;

  const dispatch = useDispatch();

  const { PaymentData } = useSelector((state: IRootState) => state);
  const payments = PaymentData && PaymentData.payments;
  const riderPayments = PaymentData && PaymentData.selectedRiderPayment;
  const paymentFormula = PaymentData && PaymentData.riderPaymentformula;

  const updatePaymenttoggleModal = (
    riderPayment: IRiderPayments,
    togglePaymentModal: () => void
  ) => {
    togglePaymentModal();
    dispatch(setSelectedRiderPayment(riderPayment));
  };

  // Get All payments

  const getriderPayments = async (hubid?: string) => {
    const payments = hubid || LoginHubid;
    showLoader();
    await axios
      .get(
        `${Parcel_Configuration}/getall/riderpayment/hubid?hubid=${payments}`
      )
      .then((response: any) => {
        dispatch(setPayments(response.data));
        hideLoader();
      })
      .catch((error: any) => {
        console.log(error);
        showError("Error While Getting Payment");
        hideLoader();
      });
  };

  // Update specific rider Amount

  const updateRiderPayment = async (
    amount: string,
    togglePaymentModal: () => void
  ) => {
    const current = new Date();
    const date = formatDate(current);
    const params = new URLSearchParams();
    params.append("riderId", riderPayments?.riderId as string);
    params.append("date", date);
    params.append("amount", amount);
    showLoader();
    await axios
      .post(`${Parcel_Configuration}/update/rider/payment?${params}`)
      .then((response: any) => {
        getriderPayments(riderPayments?.hubid);
        togglePaymentModal();
      })
      .catch((error: any) => {
        showError("Error While Updating Payment");
        hideLoader();
      });
  };

  // Add New Rider Payments
  const handleaddnewPayment = async (response: any) => {
    const pay: any = 0;
    const current = new Date();
    const date = formatDate(current);
    const params = new URLSearchParams();
    params.append("hubid", LoginHubid as any);
    params.append("name", response.data.user.userName);
    params.append("riderId", response.data.user.userId);
    params.append("amountpaid", pay);
    params.append("lastpaid", date);

    await axios
      .post(`${Parcel_Configuration}/add/riderpayment?${params}`)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        alert("Something Went Wrong");
        console.log(error, "error");
      });
  };

  //Delete Rider Payment
  const handleDeletePayment = async (userId: any) => {
    await axios
      .post(`${Parcel_Configuration}/delete/riderpayment?riderid=${userId}`)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        alert("Something Went Wrong");
        console.log(error, "error");
      });
  };

  return {
    loader,
    error,
    payments,
    riderPayments,
    paymentFormula,

    handleDeletePayment,
    getriderPayments,
    updatePaymenttoggleModal,
    updateRiderPayment,
    handleaddnewPayment,
  };
}

export default usePayment;
