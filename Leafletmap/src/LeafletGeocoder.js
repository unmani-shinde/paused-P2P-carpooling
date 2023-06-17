import React, { useState,useEffect,useMemo } from "react";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L,{icon} from "leaflet";
import { useMap } from "react-leaflet";


const customIcon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [50, 50],
});


const LeafletGeocoder = () => {
  const [selectSource, setSelectSource] = useState("");
  const [selectDestination, setSelectDestination] = useState("");
  const routingControlRef = React.useRef(null);

  const map = useMap();


  useMemo(() => {
  
    const control=L.Control.geocoder({
      defaultMarkGeocode: true,
      placeholder: 'Enter a location',
    }).addTo(map)

    const directions = L.Routing.control({
      waypoints: [
        L.latLng(selectSource.lat, selectSource.lng), 
        L.latLng(selectDestination.lat, selectDestination.lng),
      ],
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
      
    }).addTo(map);


      control.on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        console.log(latlng)
        map.fitBounds(e.geocode.bbox);

        if (!selectSource) {
          setSelectSource(latlng);
        } else if (!selectDestination) {
          setSelectDestination(latlng);
        }else {
          setSelectSource(null);
          setSelectDestination(null);
          routingControlRef.current.setWaypoints([]);
        }

        if (selectSource && selectDestination) {
          routingControlRef.current.setWaypoints([selectSource, selectDestination]);
        }
      
      });

      return () => {
        control.removeFrom(map);
        directions.removeFrom(map);
      };
      
      
      
  }, [map,selectSource, selectDestination]);

  

  return null;
};

export default LeafletGeocoder;