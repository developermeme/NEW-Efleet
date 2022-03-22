import { GoBackIcon } from "../../../asset/Icons/Icons";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import AddVehicleForm from "./AddVehicleForm";
import useVehile from "../useVehile";
import "./Style.scss";

export const AddVehicle = () => {
  const { handleRouteToList } = useVehile();

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
      <AddVehicleForm />
    </div>
  );
};
