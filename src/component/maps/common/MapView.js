import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import mapStyles from "./MapStyles";
import Warehouse from "../../../asset/Images/new.svg";
export default function MapView(props) {
  const KEY = "AIzaSyDmWLF7ThVnAkVzH3uVBvb1n_FiGaUBKwc";
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${KEY}`;

  const { mapData, isRider } = props;
  console.log("mapDta", mapData);
  function Map() {
    const initialLongitude = isRider ? 80.207397 : -75.33729;
    const initialLatitude = isRider ? 13.0248773 : 45.337298;

    const [selectedPark, setSelectedPark] = useState(null);
    const [longitude, setLongitude] = useState(initialLongitude);
    const [latitude, setLatitude] = useState(initialLatitude);
    console.log("selectedpark", selectedPark);
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        });
      }
    }, []);

    useEffect(() => {
      const listener = (e) => {
        if (e.key === "Escape") {
          setSelectedPark(null);
        }
      };
      window.addEventListener("keydown", listener);
      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, []);

    const handleSelectedPark = (data) => {
      let selectedPark = {
        hubId: data.hubId,
        lat: parseFloat(data.latitude),
        lng: parseFloat(data.longitude),
        hubName: data.hubName,
      };
      if (isRider) {
        selectedPark = {
          name: data.name,
          ...selectedPark,
        };
      }
      setSelectedPark(selectedPark);
    };

    return (
      <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultOptions={{ styles: mapStyles }}
      >
        {mapData?.map((park) => (
          <Marker
            key={park.key}
            icon={Warehouse}
            position={{
              lat: parseFloat(park.latitude),
              lng: parseFloat(park.longitude),
            }}
            onClick={() => handleSelectedPark(park)}
          />
        ))}

        {selectedPark && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedPark(null);
            }}
            position={{
              lat: selectedPark.lat,
              lng: selectedPark.lng,
            }}
          >
            <div>
              {isRider ? (
                <h6>RiderID : {selectedPark?.userId}</h6>
              ) : (
                <>
                  <h5>HubId: {selectedPark.hubId}</h5>
                  <h6>HubName: {selectedPark.hubName}</h6>
                </>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }

  const MapWrapped = withScriptjs(withGoogleMap(Map));

  return (
    <div
      style={{
        height: "40em",
        width: "100%",
      }}
    >
      <MapWrapped
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
