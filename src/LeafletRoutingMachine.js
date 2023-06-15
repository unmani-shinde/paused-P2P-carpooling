import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const LeafletRoutingMachine = ({ initialPosition }) => {
  const map = useMap();

  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: "/marche.gif",
      iconSize: [38, 38],
    });

    const marker1 = L.marker(initialPosition, { icon: DefaultIcon }).addTo(map);

    const handleClick = (e) => {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

      L.Routing.control({
        waypoints: [
          L.latLng(initialPosition),
          L.latLng(e.latlng.lat, e.latlng.lng),
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
        draggableWaypoints: true,
        fitSelectedRoutes: false,
        showAlternatives: false,
        autoRoute: true,
      })
        .on("routesfound", function (e) {
          e.routes[0].coordinates.forEach((c, i) => {
            setTimeout(() => {
              marker1.setLatLng([c.lat, c.lng]);
            }, 1000 * i);
          });
        })
        .addTo(map);
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [initialPosition, map]);

  return null;
};

export default LeafletRoutingMachine;
