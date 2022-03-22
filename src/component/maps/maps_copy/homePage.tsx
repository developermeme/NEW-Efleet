import { useEffect } from "react";
import HubMapView from "./HubMap/HubMapView";
import RiderMapView from "./RiderMap/riderMapView";
import useHub from "../../hubs/useHub";
import { useStorageValues } from "../../../hooks/useLocalStorage";
import "./homePage.css";

export default function Home() {
  const { fetchHubs, loader, error } = useHub();

  const { loginRole } = useStorageValues();

  useEffect(() => {
    if (loginRole === "SUPER_ADMIN") {
      fetchHubs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return loader;
  }

  if (error) {
    return error;
  }

  return loginRole === "SUPER_ADMIN" ? <HubMapView /> : <RiderMapView />;
}
