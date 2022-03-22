import React from "react";
import { useSelector } from "react-redux";
import { TopBar } from "./TopBar";
import { RidersCollection } from "./RidersCollection";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import "./Style.scss";

export const RidersList = () => {
  const { ridersData, navData } = useSelector((state: IRootState) => state);
  const selectedRidersView = ridersData && ridersData.selectedRidersView;
  const ridersList = ridersData && ridersData.RidersList;
  const searchValue = navData && navData.searchValue;

  return (
    <div className="rider-list">
      <TopBar selectedRidersView={selectedRidersView} />
      <RidersCollection
        selectedRidersView={selectedRidersView}
        ridersList={ridersList}
        searchValue={searchValue}
      />
    </div>
  );
};
