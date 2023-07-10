import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import setSourceAddress from "./actions/setSourceActions";
import setDestinationAddress from "./actions/setDestinationActions";
import setStops from "./actions/setStopsActions";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { useMap } from "react-leaflet";
import { useDispatch } from "react-redux";

const LeafletGeocoder = () => {
  const [selectSource, setSelectSource] = useState("");
  const [selectDestination, setSelectDestination] = useState("");
  const routingControlRef = useRef(null);
  const map = useMap();

  const dispatch = useDispatch();

  const handleShare = (waypoints) => {
    waypoints.forEach((waypoint, index) => {
      const locationName = waypoint.name || "";
      console.log(`Waypoint ${index + 1}:`, locationName);
    });
  
    if (waypoints.length > 0) {
      dispatch(setSourceAddress(waypoints[0].name));
      dispatch(setDestinationAddress(waypoints[waypoints.length - 1].name));
    } else {
      dispatch(setSourceAddress(""));
      dispatch(setDestinationAddress(""));
    }

    if(waypoints.length > 0) {
      const sharedWaypoints = waypoints
    .slice(1, -1) // Exclude the source and destination waypoints
    .map((waypoint) => waypoint.name || "")
    .join(";");
    dispatch(setStops(sharedWaypoints));
    }
    else{
      dispatch(setStops(""));
    }
  };
  

  useEffect(() => {
    const directions = L.Routing.control({
      waypoints: [
        selectSource ? L.latLng(selectSource.lat, selectSource.lng) : null,
        selectDestination ? L.latLng(selectDestination.lat, selectDestination.lng) : null,
      ].filter(Boolean),
      lineOptions: {
        styles: [
          {
            color: "blue",
            weight: 4,
            opacity: 0.7,
          },
        ],
      },
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
      addWaypoints: true,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    });

    routingControlRef.current = directions.addTo(map);

    return () => {
      routingControlRef.current.remove();
    };
  }, [map, selectSource, selectDestination]);

  useEffect(() => {
    if (routingControlRef.current) {
      const waypoints = routingControlRef.current.getWaypoints();
      handleShare(waypoints);
    }
  }, [selectSource, selectDestination]);

  console.log("render:", selectSource, selectDestination);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div style={{ position: "absolute", bottom: "10px", left: "10px", zIndex: "1000" }}>
        <button
          style={{ backgroundColor: "#116D6E", color: "white", padding: "1vh", borderRadius: "10px", marginLeft: "25vw", fontWeight:"700", fontSize:"large" }}
          onClick={() => {
            if (routingControlRef.current) {
              const waypoints = routingControlRef.current.getWaypoints();
              handleShare(waypoints);
            }
          }}
        >
          Update Journey Details
        </button>
      </div>
      <div style={{ border: "1px solid black", position: "relative", height: "100%" }}></div>
    </div>
  );
};

export default LeafletGeocoder;
