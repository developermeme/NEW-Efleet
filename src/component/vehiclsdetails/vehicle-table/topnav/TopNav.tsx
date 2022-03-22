import useVehile from "../../useVehile";
import { AddIcon } from "../../../../asset/Icons/Icons";
import MultiDropdown from "../../../../ui-kit/MultiDropdown/MultiDropdown";
import { TextButton } from "../../../../ui-kit/TextButton/TextButton.view";

import "./TopNav.scss";
import { VehiclePageEnum } from "../../../../redux/slice/vehicle-slice/Types";

function TopNav() {
  const { handlePageToggle, handleFiltersChange } = useVehile();

  return (
    <div className="add-vehicle-topnav">
      <div className="add-vehicle-dropdown">
        <MultiDropdown
          placeholder="Select Status"
          multiple={false}
          options={[{ value: "Active" }, { value: "Deactive" }]}
          handleFiltersChange={handleFiltersChange.bind(null, "status")}
        />
        <MultiDropdown
          placeholder="Select Type"
          multiple
          options={[{ value: "Fuel" }, { value: "EV" }]}
          handleFiltersChange={handleFiltersChange.bind(null, "type")}
        />
      </div>

      <TextButton
        isprimary
        className="btn-add"
        onClick={() => {
          handlePageToggle(VehiclePageEnum.ADD_VEHICLE);
        }}
        items={
          <>
            <AddIcon />
            New Vehicle
          </>
        }
      />
    </div>
  );
}

export default TopNav;
