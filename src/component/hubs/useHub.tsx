import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { user_baseURL } from "../../util/configFile";
import { IRootState } from "../../redux/reducer/CombineReducer";
import { onClick } from "../../helper/Properties";
import useRiders from "../riders/useRiders";
import { useError, usePageLoader } from "../../hooks/Index";
import { HubPageEnum, IHub } from "../../redux/slice/hub-slice/Types";
import {
  sethubs,
  setSelectedHubDetails,
  setSelectedHubPage,
} from "../../redux/slice/hub-slice/Slice";

function useHub() {
  const dispatch = useDispatch();

  const { fetchRider } = useRiders();

  const { hubData } = useSelector((state: IRootState) => state);
  const hubList = hubData && hubData.hubs;
  const selectedHub = hubData && hubData.selectedHub;
  const hubPage = hubData && hubData.selectedHubPage;
  const selectedHubDetails = hubData && hubData.selectedHubDetails;

  const [loader, showLoader, hideLoader] = usePageLoader() as any;
  const [error, showError] = useError() as any;

  const toggleHubPage = (e: onClick, page: HubPageEnum) => {
    e.preventDefault();
    dispatch(setSelectedHubPage(page));
  };

  const toggleDetailsPage = (e: onClick, item: IHub) => {
    toggleHubPage(e, HubPageEnum.DETAILS);
    dispatch(setSelectedHubDetails(item));
  };

  const toggleRidersPage = (e: onClick, item: IHub) => {
    toggleHubPage(e, HubPageEnum.RIDERS);
    fetchRider(item.hubId);
  };

  const fetchHubs = async () => {
    showLoader();
    await axios
      .get(`${user_baseURL}/users/getalladmin`)
      .then((response: any) => {
        const hubs = response.data?.user;
        dispatch(sethubs(hubs));
        dispatch(setSelectedHubPage(HubPageEnum.LIST));
        hideLoader();
      })
      .catch((error: any) => {
        hideLoader();
        showError(error);
      });
  };

  const handleApproveHub = async (e: onClick, hubid: string) => {
    let req = { userId: hubid, approvedStatus: true };
    await axios
      .put(`${user_baseURL}/users/updatestatus`, req)
      .then((response: any) => {
        fetchHubs();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleRejectHub = async (e: onClick, hubid: string) => {
    await axios
      .delete(`${user_baseURL}/users/hubadminreg/${hubid}`)
      .then((response: any) => {
        fetchHubs();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return {
    loader,
    error,
    hubList,
    selectedHub,
    hubPage,
    selectedHubDetails,
    fetchHubs,
    toggleHubPage,
    toggleDetailsPage,
    handleApproveHub,
    toggleRidersPage,
    handleRejectHub,
  };
}

export default useHub;
