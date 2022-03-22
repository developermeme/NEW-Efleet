import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHub from "../hubs/useHub";
import useRiders from "../riders/useRiders";
import MapView from "./common/MapView";
import { useStorageValues } from "../../hooks/Index";
import "./Maps.css";

var io = require("socket.io-client");
let ioClient = io.connect("http://e-bikefleet.com:5001");

export default function Maps() {
  const { fetchHubs } = useHub();
  const { fetchRider, loader, error } = useRiders();

  const { loginRole, LoginHubid } = useStorageValues();

  const [ridersList, setRidersList] = useState();

  const { hubData } = useSelector((state) => state);
  const hubs = hubData && hubData.hubs;

  const maphubData =
    hubs?.map((item) => {
      return {
        key: item.hubId,
        hubId: item.hubId,
        latitude: item.hubLatitute,
        longitude: item.hubLongitude,
      };
    }) || [];

  // const mapRiders = ridersList?.filter((item) =>
  //   console.log("ride", item.hubid )
  // );

  const mapRiderData = ridersList
    ?.filter((item) => {
      return item.hubid === LoginHubid;
    })
    ?.map((item) => {
      console.log("ride", item);
      return {
        key: item.name,
        name: item.name,
        hubId: item.hubId || LoginHubid,
        latitude: item.lat,
        longitude: item.lang,
      };
    });
  console.log("mapRiderData", mapRiderData);
  const filteredList = loginRole === "SUPER_ADMIN" ? maphubData : mapRiderData;
  const isRider = loginRole === "SUPER_ADMIN" ? false : true;

  useEffect(() => {
    const interval = setInterval(() => {
      ioClient.on("check", (msg) => setRidersList(msg));
    }, 500000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchHubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return <MapView mapData={filteredList} isRider={isRider} />;
}
