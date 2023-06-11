import React,{useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css'


function MapWithMarkers() {
  const [mapCenter, setMapCenter] = useState([20.5,78.9]);
  const [markers, setMarkers] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');


  const handleAddMarker = () => {
    if (latitude && longitude) {
      const newMarker = {
        position: [parseFloat(latitude), parseFloat(longitude)],
        label: `Marker ${markers.length + 1}`
      };

      setMarkers([...markers, newMarker]);
      setLatitude('');
      setLongitude('');

      setMapCenter([parseFloat(latitude), parseFloat(longitude)])
    }
  };
    const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;

    setLatitude(lat);
    setLongitude(lng);
  };
  function AddMarkerToMap() {
    useMapEvents({
      click: handleMapClick
    });

    return null;
  }



  return (
  <div className='MAP_BOLO_MAP' >
      <div>
        <label>Latitude:</label>
        <input
          type="number"
          step="any"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input
          type="number"
          step="any"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <button onClick={handleAddMarker}>Add Marker</button>

      <MapContainer center={mapCenter} zoom={5} style={{ height: '600px', width: '100%' }} onClick={handleMapClick}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddMarkerToMap/>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapWithMarkers;