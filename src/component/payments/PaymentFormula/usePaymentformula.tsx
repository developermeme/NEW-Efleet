import axios from "axios";
import { useDispatch } from "react-redux";
import {
  useError,
  usePageLoader,
  useStorageValues,
} from "../../../hooks/Index";
import { setRiderPaymentFormula } from "../../../redux/slice/payment-slice/Slice";
import { Parcel_Configuration } from "../../../util/configFile";

export default function usePaymentformula() {
  const { LoginHubid } = useStorageValues();
  const [loader, showLoader, hideLoader] = usePageLoader() as any;

  const [error, showError] = useError() as any;
  const dispatch = useDispatch();

  //get salary Formula
  const getPaymentformula = async () => {
    await axios
      .get(`${Parcel_Configuration}/getformula/hubid?hubid=${LoginHubid}`)
      .then((response: any) => {
        console.log(response);

        dispatch(setRiderPaymentFormula(response.data));
      })
      .catch((error: any) => {
        alert("Something Went Wrong");
        console.log(error, "error");
      });
  };

  //add new paymentformula
  const handleaddnewPayment = async (
    addupdateFormula: any,
    togglePaymentModal: () => void
  ) => {
    const params = new URLSearchParams();
    params.append("hubid", LoginHubid || "");
    params.append("distance", addupdateFormula.distance);
    params.append("type", "BIKE");
    params.append("weight", addupdateFormula.weight);
    showLoader();
    await axios;
    axios
      .post(`${Parcel_Configuration}/addFormula?${params}`)
      .then((response: any) => {
        console.log(response);
        togglePaymentModal();
        getPaymentformula();
        hideLoader();
      })
      .catch((error: any) => {
        showError("Error While Updating Payment");
        hideLoader();
      });
  };
  //delete salaryFormula

  const deletePaymentformula = async (fid: any) => {
    let confirmation = window.confirm("Are you want to delete the zone ?");
    if (confirmation === true) {
      await axios
        .post(`${Parcel_Configuration}/deleteFormula?id=${fid}`)
        .then((response: any) => {
          console.log(response);
          getPaymentformula();
          hideLoader();
        })
        .catch((error: any) => {
          alert("Something Went Wrong");
          console.log(error, "error");
        });
    } else {
      console.log("deleted ");
    }
  };

  return {
    loader,
    error,
    getPaymentformula,
    handleaddnewPayment,
    deletePaymentformula,
  };
}
