import { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";


import riderMapStyle from "./riderMapStyle";


const KEY = "AIzaSyDmWLF7ThVnAkVzH3uVBvb1n_FiGaUBKwc";
var io = require("socket.io-client");
let ioClient = io.connect("http://e-bikefleet.com:5001");

function Map() {

  const [selectedRider, setSelectedRider] = useState(null);
  const [longitude, setLongitude] = useState(-75.33729);
  const [latitude, setLatitude] = useState(45.337298);

  const [ridersList, setRidersList] = useState();
  
  useEffect(() => {
    const interval = setInterval(() => {
      ioClient.on("check", (msg) => setRidersList(msg));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
 
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
        setSelectedRider(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);


  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: latitude, lng: longitude }}
      defaultOptions={{ styles: riderMapStyle }}
    >
      {ridersList?.map((rider) => (
        <Marker
          key={rider.name}
          position={{
            lat: parseFloat(rider.lat),
            lng: parseFloat(rider.lang),
          }}
          onClick={() => {
            setSelectedRider({
              userId: rider.name,
              lat: parseFloat(rider.lat),
              lng: parseFloat(rider.lang),
            });
          }}
        />
      ))}
      

      {selectedRider && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedRider(null);
          }}
          position={{
            lat: selectedRider.lat,
            lng: selectedRider.lng,
          }}
        >
          <div>
            <h6>RiderID : {selectedRider?.userId}</h6>
            {/* <p>{selectedRider.properties.DESCRIPTIO}</p> */}
          </div>
        </InfoWindow>
      )}
      
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function RiderMapView() {
  return (
    <div
      style={{
        // height: "40em",
        height: "100%",
        width: "100%",
        paddingBottom:"20px"
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
