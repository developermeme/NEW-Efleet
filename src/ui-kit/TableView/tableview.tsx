import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { IVehicle } from "../../redux/slice/vehicle-slice/Types";
import "./tableview.scss";

function Tableview(props: any) {
  const { head, filteredData } = props;
  return (
    <div className="vehicle-table">
      <table>
        <thead>
          <tr>
            {head.map((item: string) => (
              <th key={item}>
                <label>{item}</label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item: IVehicle) => {
            return (
              <tr key={item.vehicleId}>
                <td data-label="Veh Id">{item.vehicleId || "N/A"}</td>
                <td data-label="Chassiss No">{item.chassisNumber || "N/A"}</td>
                <td data-label="Model">{item.model || "N/A"}</td>
                <td data-label="Hub Name">{item.hubName || "N/A"}</td>
                <td data-label="Vehicle Type">{item.vehicleType || "N/A"}</td>
                <td data-label="Status">{item.vehicleStatus || "N/A"}</td>
                <td
                  onClick={() => {
                    handleVehicleDetailClick(item);
                  }}
                >
                  <FiArrowRight />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Tableview;
function handleVehicleDetailClick(item: IVehicle) {
  throw new Error("Function not implemented.");
}
