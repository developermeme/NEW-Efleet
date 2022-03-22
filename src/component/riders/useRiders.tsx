import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Parcel_Configuration, user_baseURL } from "../../util/configFile";
import { onClick } from "../../helper/Properties";
import { IRootState } from "../../redux/reducer/CombineReducer";
import { PackageServices } from "../../util/API";
import { formatDate } from "../../helper/Script";
import { useError, usePageLoader, useStorageValues } from "../../hooks/Index";
import {
  IEarning,
  IRiderDetail,
  RidersPageEnum,
} from "../../redux/slice/riders-slice/Types";
import {
  setEarningDetails,
  setRidersList,
  setSelectedRider,
  setSelectedRidersPage,
  setTaskDetails,
  setTransactionDetails,
} from "../../redux/slice/riders-slice/Slice";

function useRiders() {
  const { LoginHubid } = useStorageValues();
  const { ridersData } = useSelector((state: IRootState) => state);
  const ridersList = ridersData && ridersData.RidersList;
  const selectedRider =
    ridersData && (ridersData.selectedRider as IRiderDetail);
  const taskDetails = ridersData && ridersData.TaskDetails;
  const earningDetails = ridersData && (ridersData.earningDetails as IEarning);
  const transactionDetails = ridersData && ridersData.transactionDetails;

  const dispatch = useDispatch();
  const formattedDate: any = formatDate(new Date());

  const [loader, showLoader, hideLoader] = usePageLoader() as any;
  const [error, showError] = useError() as any;

  const handleGoBack = (e?: onClick) => {
    e?.preventDefault();
    dispatch(setSelectedRidersPage(RidersPageEnum.Rider_LIST));
  };

  const fetchRider = async (hubid?: string) => {
    const hubId = hubid || LoginHubid;
    showLoader();
    await axios
      .get(`${user_baseURL}/users/allridersid/${hubId}`)
      .then((response: any) => {
        const postRiders = response?.data?.user;
        dispatch(setRidersList(postRiders));
        hideLoader();
        handleGoBack();
      })
      .catch((error: any) => {
        hideLoader();
        showError(error);
      });
  };

  const fetchDeliveryDetailByDate = async (id: string, date: any) => {
    showLoader();
    await PackageServices.getDeliveryDetailsByDate({
      riderId: id,
      date: date,
    })
      .then((response: any) => {
        const resp: any = response.data;
        dispatch(setTaskDetails(resp));
        hideLoader();
      })
      .catch((error: any) => {
        hideLoader();
        showError(error);
      });
  };

  const fetchDeliveryDetail = async (id: string) => {
    showLoader();
    await PackageServices.getDeliveryDetails({
      riderId: id,
    })
      .then((response: any) => {
        const resp: any = response.data;
        dispatch(setTaskDetails(resp));
        hideLoader();
      })
      .catch((error: any) => {
        hideLoader();
        showError(error);
      });
  };

  const fetchTransactionDetail = async () => {
    showLoader();
    const tr = selectedRider.userId;
    await axios
      .get(
        `${Parcel_Configuration}/get/rider/transaction/history?riderId=${tr}`
      )
      .then((response: any) => {
        dispatch(setTransactionDetails(response.data));
        hideLoader();
      })
      .catch((error: any) => {
        console.log(error);
        showError("Error While Getting Payment");
        hideLoader();
      });
  };

  const fetchEarningDetails = async (id: string) => {
    showLoader();
    await PackageServices.getEarningsDetails({
      riderid: id,
    })
      .then((response: any) => {
        const resp: any = response.data;
        dispatch(setEarningDetails(resp));
        hideLoader();
      })
      .catch((error: any) => {
        hideLoader();
        showError(error);
      });
  };

  const fetchRidersDetails = (rider: IRiderDetail) => {
    dispatch(setSelectedRidersPage(RidersPageEnum.RIDER_DETAIL));
    dispatch(setSelectedRider(rider));
    fetchDeliveryDetailByDate(rider.userId, formattedDate);
    fetchEarningDetails(rider.userId);
  };

  const handleRiderDetails = (e: onClick, rider: IRiderDetail) => {
    e.preventDefault();
    fetchRidersDetails(rider);
  };

  return {
    loader,
    error,
    ridersList,
    selectedRider,

    formattedDate,
    taskDetails,
    earningDetails,
    transactionDetails,
    fetchRider,
    fetchRidersDetails,
    handleGoBack,
    handleRiderDetails,
    fetchTransactionDetail,
    fetchDeliveryDetailByDate,
    fetchDeliveryDetail,
  };
}

export default useRiders;
