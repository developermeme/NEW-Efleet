import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/reducer/CombineReducer";
import { user_baseURL } from "../../util/configFile";
import { onClick } from "../../helper/Properties";
import { usePageLoader, useError } from "../../hooks/Index";
import {
  IVehicle,
  VehiclePageEnum,
} from "../../redux/slice/vehicle-slice/Types";
import {
  setSelectedVehicle,
  setSelectedVehiclePage,
  setVehicleFilters,
  setVehicleList,
} from "../../redux/slice/vehicle-slice/Slice";
import { useStorageValues } from "../../hooks/Index";
function useVehile() {
  const { LoginHubid } = useStorageValues();
  const { vehicleData, navData } = useSelector((state: IRootState) => state);
  const searchValue = navData && navData.searchValue;
  const selectedVehiclePage = vehicleData && vehicleData.selectedVehiclePage;
  const vehicleList = vehicleData && vehicleData.vehicleList;
  const selectedFilters = vehicleData && vehicleData.selectedFilters;
  const selectedVehicle = vehicleData && vehicleData.selectedVehicle;

  const dispatch = useDispatch();

  const [loader, showLoader, hideLoader] = usePageLoader() as any;
  const [error, showError] = useError() as any;

  const handlePageToggle = (Page: VehiclePageEnum) => {
    dispatch(setSelectedVehiclePage(Page));
  };

  const handleRouteToList = (e?: onClick) => {
    e?.preventDefault();
    handlePageToggle(VehiclePageEnum.VEHICLE_LIST);
  };

  const handleFiltersChange = (key: string, values: string[]) => {
    dispatch(
      setVehicleFilters({
        key,
        value: values,
      })
    );
  };

  const handleVehicleDetailClick = (item: IVehicle) => {
    dispatch(setSelectedVehicle(item));
    handlePageToggle(VehiclePageEnum.VEHICLE_DETAIL);
  };

  const fetchVehicleList = async () => {
    await axios
      .get(`${user_baseURL}/vehicle`)
      .then((response: any) => {
        showLoader();
        const res = response.data?.vehicle;
        const newArr = res?.filter((x: any) => x.hubName === LoginHubid);
        dispatch(setVehicleList(newArr));
        handleRouteToList();
        hideLoader();
      })
      .catch((error: any) => {
        hideLoader();
        showError(error);
      });
  };
  const handleDeleteVehicle = async (vehicleId: any) => {
    await axios
      .delete(`${user_baseURL}/vehicle/${vehicleId}`)
      .then((response: any) => {
        showLoader();

        handleRouteToList();
        hideLoader();
      })
      .catch((error: any) => {
        hideLoader();
        showError(error);
      });
  };
  return {
    error,
    loader,
    vehicleList,
    searchValue,
    selectedVehicle,
    selectedFilters,
    selectedVehiclePage,
    handleDeleteVehicle,
    handleRouteToList,
    handlePageToggle,
    fetchVehicleList,
    handleFiltersChange,
    handleVehicleDetailClick,
  };
}

export default useVehile;
