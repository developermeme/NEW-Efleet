import React from "react";
import { useSelector } from "react-redux";
import { TopNav } from "./TopNav";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import { RidersCollection } from "../../riders/riders-list/RidersCollection";
import "./HubRiders.scss";

function HubRiders() {
  const { ridersData, navData } = useSelector((state: IRootState) => state);
  const selectedRidersView = ridersData && ridersData.selectedRidersView;

  const ridersList = ridersData && ridersData.RidersList;
  const searchValue = navData && navData.searchValue;

  return (
    <div>
      <TopNav selectedRidersView={selectedRidersView} />
      <RidersCollection
        selectedRidersView={selectedRidersView}
        ridersList={ridersList}
        searchValue={searchValue}
      />
    </div>
  );
}

export default HubRiders;
