import React, { useEffect } from "react";
import { AddVehicle } from "./addvehicle/Index";
import VehicleTable from "./vehicle-table/VehicleTable";
import useVehile from "./useVehile";
import VehicleDetailCard from "./detail-card/Card";
import { VehiclePageEnum } from "../../redux/slice/vehicle-slice/Types";

function VehicleDetails() {
  const { selectedVehiclePage, fetchVehicleList, loader, error } = useVehile();

  useEffect(() => {
    fetchVehicleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return loader;
  }

  if (error) {
    return error;
  }

  let component =
    selectedVehiclePage === VehiclePageEnum.VEHICLE_LIST ? (
      <VehicleTable />
    ) : selectedVehiclePage === VehiclePageEnum.ADD_VEHICLE ? (
      <AddVehicle />
    ) : (
      <VehicleDetailCard />
    );

  return component;
}

export default VehicleDetails;
