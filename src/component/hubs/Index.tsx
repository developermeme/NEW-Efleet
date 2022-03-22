import React, { useEffect } from "react";
import useHub from "./useHub";
import HubList from "./hub-list/HubList";
import HubDetails from "./hub-details/HubDetails";
import HubRiders from "./hub-riders/HubRiders";
import "./Style.scss";
import { HubPageEnum } from "../../redux/slice/hub-slice/Types";

export const Hubs = () => {
  const { fetchHubs, hubPage } = useHub();

  useEffect(() => {
    fetchHubs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hubs-container">
      {hubPage === HubPageEnum.LIST ? (
        <HubList />
      ) : hubPage === HubPageEnum.DETAILS ? (
        <HubDetails />
      ) : (
        <HubRiders />
      )}
    </div>
  );
};
