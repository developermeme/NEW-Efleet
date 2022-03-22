import React from "react";
import { GoBackIcon } from "../../../asset/Icons/Icons";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import useVehile from "../useVehile";
import "./Card.scss";

function VehicleDetailCard() {
  const { handleRouteToList, selectedVehicle } = useVehile();

  const VehicleDetails = {
    "Reg No": selectedVehicle?.reg_No,
    "Speed Limit": selectedVehicle?.speed_Limit,
    "Vehicle Type": selectedVehicle?.vehicleType,
    "Hub Location": selectedVehicle?.hubName,
    "Vehicle ID": selectedVehicle?.vehicleId,
    "Chassis Number": selectedVehicle?.chassisNumber,
  };

  return (
    <div className="add_vehicle_container">
      <div className="add-vehicle-topnav">
        <TextButton
          className="btn-goback"
          onClick={handleRouteToList as any}
          items={
            <>
              <GoBackIcon /> Go Back
            </>
          }
        />
      </div>
      <div className="vehicle-detail-card u-h4">
        <table>
          <tbody>
            {Object.entries(VehicleDetails).map(([key, value]) => (
              <tr key={key}>
                <td> {key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleDetailCard;
