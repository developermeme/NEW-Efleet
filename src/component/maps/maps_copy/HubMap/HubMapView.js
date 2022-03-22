import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import mapStyles from "./mapStyle";

const KEY = "AIzaSyDmWLF7ThVnAkVzH3uVBvb1n_FiGaUBKwc";

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  const [longitude, setLongitude] = useState(77.2254);
  const [latitude, setLatitude] = useState(28.6076);

  const { hubData } = useSelector((state) => state);
  const hubs = hubData && hubData.hubs;
  console.log("hubs", hubs);
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

  return (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: latitude, lng: longitude }}
      defaultOptions={{ styles: mapStyles }}
    >
      {hubs.map((park) => (
        <Marker
          key={park.hubId}
          position={{
            lat: parseFloat(park.hubLatitute),
            lng: parseFloat(park.hubLongitude),
          }}
          onClick={() => {
            setSelectedPark({
              hubId: park.hubId,
              lat: parseFloat(park.hubLatitute),
              lng: parseFloat(park.hubLongitude),
            });
          }}
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
            <h6>HubId : {selectedPark.hubId}</h6>
            {/* <p>{selectedPark.properties.DESCRIPTIO}</p> */}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function HubMapView() {
  return (
    <div
      style={{
        height: "40em",
        width: "100%",
      }}
    >
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
