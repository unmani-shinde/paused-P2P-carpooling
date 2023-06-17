import React, { useState, useEffect } from "react";
import L, { icon } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = () => {
  const [selectSource, setSelectSource] = useState(null);
  const [selectDestination, setSelectDestination] = useState(null);

  const map = useMap();
  let DefaultIcon = L.icon({
    iconUrl: "./placeholder.png",
    iconSize: [50, 50],
  });

  let CarIcon = L.icon({
    iconUrl: "./caricon.png",
    iconSize: [70, 70],
  });

  let BlueIcon = L.icon({
    iconUrl: "./blueicon.png",
    iconSize: [50, 50],
  });

  useEffect(() => {
    var marker1 = L.marker([20.5, 78.9], { icon: CarIcon }).addTo(map);

    const handleMapClick = (e) => {
      if (!selectSource) {
        setSelectSource(e.latlng); 
      } else if (!selectDestination) {
        setSelectDestination(e.latlng); 
      }

      if (selectSource && selectDestination) {
        L.marker([selectSource.lat, selectSource.lng]
        )
        L.marker([selectDestination.lat, selectDestination.lng]
          )
        L.Routing.control({
          waypoints: [
            L.latLng(selectSource.lat, selectSource.lng), // Use the selected source location
            L.latLng(selectDestination.lat, selectDestination.lng), // Use the selected destination location
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
          routeWhileDragging: false,
          geocoder: L.Control.Geocoder.nominatim(),
          addWaypoints: true,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
          showAlternatives: false,
          waypointIcon :BlueIcon,
          icon: BlueIcon
        })
          .on("routesfound", function (e) {
            e.routes[0].coordinates.forEach((c, i) => {
              setTimeout(() => {
                marker1.setLatLng([c.lat, c.lng]);
              }, 1000 * i);
            });
          })
          .addTo(map);
      }
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [map, selectSource, selectDestination]);

  return null;
};

export default LeafletRoutingMachine;
