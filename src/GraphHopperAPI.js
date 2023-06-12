//Effectively for Distance and Duration Calculation

import React, { useState } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import Maps from './Map';
import SearchBox from './Searchbox';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://www.clipartmax.com/png/middle/213-2135726_location-pin-icon-google-maps-blue-marker.png",
  iconSize: [38,38]
});


function GraphAPI(){
    const [duration, setDuration] = useState('');
  const [pointA, setPointA] = useState('');
  const [pointB, setPointB] = useState('');
  const [stops, setStops] = useState([]);
  const [stop, setStop] = useState('');
  const [showAddStop, setShowAddStop] = useState(false);
  const [showStops, setShowStops] = useState(false);

  const [selectPosition, setSelectPosition] = useState("");
  const [selectSourcePosition, setSelectSourcePosition] = useState("");
  const [selectDestinationPosition, setSelectDestinationPosition] = useState("");

  const handleSetPointA = (lat,lon) => {
    const temp = selectSourcePosition.lat+","+selectSourcePosition.lon;
    setPointA(temp);
    console.log(temp);
  };

  const handleSetPointB = (lat,lon) => {
    setPointB((selectDestinationPosition.lat+","+selectDestinationPosition.lon));
    console.log((selectDestinationPosition.lat+","+selectDestinationPosition.lon))
  };


  const handleAddStop = () => {
    const updatedStops = [...stops, stop];
    setStops(updatedStops);
    alert("Given stop has been added.");

    
  };
  
  const handleRemoveStop = (index) => {
    const updatedStops = [...stops];
    updatedStops.splice(index, 1);
    setStops(updatedStops);
    alert("Given stop has been removed.")
  };
  

  const handleShowAddStop = () => {
    setShowAddStop(!showAddStop);
  };

  const handleToggleStops = () => {
    setShowStops(!showStops);
  };


  
const handleCalculateDuration = async () => {
    const apiKey = 'd02bc9a1-766f-4ae3-8bfd-fa504dc406b7'; 
    const points = [pointA,pointB];
      
      const query = new URLSearchParams({
        profile: 'car',
        key: apiKey,
      });
      
      points.forEach(point => {
        query.append('point', point);
      });
      
      const url = `https://graphhopper.com/api/1/route?${query.toString()}`;
      console.log(url);
      
      
      const url2 = decodeURIComponent(url);
      console.log(url2);

    try {
      const response = await axios.get(url2);
      const data = response.data;
      console.log(data);

      if (data.paths && data.paths.length > 0) {
        const calculatedTime = data.paths[0].time;
        const seccalculatedTime = Math.floor(calculatedTime / 1000);
        const hours = Math.floor(seccalculatedTime / 3600);
        const minutes = Math.floor((seccalculatedTime % 3600) / 60);
        setDuration(`${hours} hours ${minutes} minutes`);
      } else {
        setDuration('Time calculation failed');
      }
    } catch (error) {
      console.error(error);
      setDuration('Error calculating time');
      
    }
  };

  return(
    <>

    <div className="App">

    <div style={{ display: 'flex', flexDirection: 'row', width: "100vw", height:"100vh"}}>
      <div style={{width:"50vw", height:"100%"}}>
        <Maps selectSourcePosition={selectSourcePosition} selectDestinationPosition={selectDestinationPosition}/>
      </div>
     <div style={{border: "2px solid red",width:"50vw", height:"100%"}}>
      <div className="SourcePoint">
        <h2>Enter Your Source: </h2>
        <SearchBox  setSelectPosition ={setSelectSourcePosition}/>
        
     </div>

     <div className="DestinationPoint" style={{marginTop:"20px"}}>
     <h2>Enter Your Destination: </h2>
        <SearchBox 
            setSelectPosition={setSelectDestinationPosition}/>
     </div>

     <div className="MarkerContainer">
          {selectSourcePosition && (
            <div className="SourceMarker">
              <h3>Source Marker</h3>
              Latitude: {selectSourcePosition.lat}, Longitude: {selectSourcePosition.lon}
              
            </div>
          )}
          {selectDestinationPosition && (
            <div className="DestinationMarker">
              <h3>Destination Marker</h3>
              Latitude: {selectDestinationPosition.lat}, Longitude: {selectDestinationPosition.lon}
              <button onClick={() => {
                                handleSetPointA(selectSourcePosition.lat,selectSourcePosition.lon);
                                handleSetPointB(selectDestinationPosition.lat,selectDestinationPosition.lon);
              }}>Confirm Location:</button>
            </div>
          )}
        </div>
        
        
     </div>
    </div>

        
        <button onClick={handleCalculateDuration} className='calculate'>Calculate Duration</button>
      </div>
      {duration && (
        <div className="result-container">
          <p>Duration: {duration}</p>
        </div>
      )}

      {/* Stop Add + Remove Functionality */}


      





      {showStops && stops.length > 0 && (
          <div>
            {stops.map((stop, index) => (
              <div key={index}>
                <label>Stop {index + 1}</label><br></br>
                <input type="text" value={stop} disabled />
                <button className='remove-stop' onClick={() => handleRemoveStop(index)}>
                  Remove Stop
                </button>
              </div>
            ))}
          </div>
        )}

        <button onClick={handleToggleStops} className='view'>
          {showStops ? "Hide Stops" : "View Stops"}
        </button>

        {showStops && stops.length === 0 && <p>No stops added yet.</p>}

        {showStops && (
          <div>

            <button onClick={handleShowAddStop} className='add-stop'>{showAddStop ? "Done" : "Add Stop"}</button><br></br>

            {showAddStop && (<div>
                <label className='add-stop-label'>Add Stop:</label><br></br>
            <input
              type="text"
              value={stop}
              onChange={(e) => setStop(e.target.value)}
            />

            <button onClick={handleAddStop} className='side-add-stop'>Add Stop</button>
<br></br>
<br></br>
            <label className='add-stop-label'>Enter specific coordinates:</label><br></br>
            <input
            type="text"
            value={stop}
            onChange={(e) => {
              const coordinates = e.target.value.split(",");
              if (coordinates.length === 2) {
                const stoplatitude = parseFloat(coordinates[0]);
                const stoplongitude = parseFloat(coordinates[1]);
                setStop({ lat: stoplatitude, lon: stoplongitude });
              } else {
                setStop({ lat: null, lon: null });
              }
            }}
/>
            {/* <button onClick={markStopOnMap} className='side-add-stop'>Confirm coordinates:</button> */}

            


            </div>

            
            
            
            )}

           
          </div>
          
          
        )}

        

      
    </>
  )
}

export default GraphAPI;