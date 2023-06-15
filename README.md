# LeafletMap

You can start by execute npm start

http://localhost:3000

# Details

You can use the leaflet with autocomplete in the src/LeafletGeocoder.js file

You can use the leaflet with routing in the src/LeafletRoutingMachine.js file

you can change the icon of marker by adding

let DefaultIcon = L.icon({
iconUrl: your iconPath,
iconSize: [25, 41],
iconAnchor: [10, 41],
popupAnchor: [2, -40],
});

L.Marker.prototype.options.icon = DefaultIcon;

# Requirements

npm i --save leaflet leaflet-control-geocoder leaflet-routing-machine

import "leaflet-control-geocoder/dist/Control.Geocoder.css";

import "leaflet-control-geocoder/dist/Control.Geocoder.js";
