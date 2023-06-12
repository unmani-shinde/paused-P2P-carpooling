import React, {useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

const icon = L.icon({
    iconUrl: "./placeholder.png",
    iconSize: [38,38]
});

const position = [19.0760, 72.8777]

function ResetCenterView(props){
    const {selectPosition} = props;
    const map = useMap();
  
    useEffect(() => {
       if (selectPosition){
        map.setView(
            L.latLng(selectPosition?.lat, selectPosition?.lon),
            map.getZoom(),
            {
                animate: true
            }
        )
    }
    },[selectPosition,map]);

    

    return null;
}


export default function Maps(props) {
    const {selectSourcePosition,selectDestinationPosition} = props;
    const sourceLocation = [selectSourcePosition?.lat, selectSourcePosition?.lon];
    const destinationLocation = [selectDestinationPosition?.lat, selectDestinationPosition?.lon];
    
return(
  <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{width:"100%", height:"100%"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=OnXJPBh7IkMHefqgKgQS"
    />
    
    {selectSourcePosition && (
    <Marker position={sourceLocation}  icon={icon}>
      <Popup>
        Source Marker: <br />
        Latitude: {selectSourcePosition.lat} <br />
        Longitude: {selectSourcePosition.lon}
      </Popup>
    </Marker>
    
    )}

    {selectDestinationPosition && (
        <Marker position={destinationLocation}  icon={icon}>
          <Popup>
            Destination Marker: <br />
            Latitude: {selectDestinationPosition.lat} <br />
            Longitude: {selectDestinationPosition.lon}
          </Popup>
        </Marker>
        
        )}

    <ResetCenterView  selectPosition={selectSourcePosition && selectDestinationPosition}/>
  </MapContainer>
);
}