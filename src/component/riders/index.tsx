import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/reducer/CombineReducer";
import { RidersPageEnum } from "../../redux/slice/riders-slice/Types";

import { AddRider } from "./add-rider/Index";
import { RiderDetails } from "./riders-details/Index";
import { RidersList } from "./riders-list/Index";
import useRiders from "./useRiders";

function Riders() {
  const { ridersData } = useSelector((state: IRootState) => state);
  const selectedRidersPage = ridersData && ridersData.selectedRidersPage;

  const { loader, error, fetchRider } = useRiders();

  let component;

  // API call to get all riders
  useEffect(() => {
    fetchRider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return loader;
  }

  if (error) {
    return error;
  }

  component =
    selectedRidersPage === RidersPageEnum.Rider_LIST ? (
      <RidersList />
    ) : selectedRidersPage === RidersPageEnum.RIDER_DETAIL ? (
      <RiderDetails />
    ) : (
      <AddRider />
    );

  return component;
}

export default Riders;
