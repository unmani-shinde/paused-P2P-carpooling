import React, { useState } from 'react';
import axios from 'axios';
import "../stylesheets/axiosAPI.css";

function AxiosAPI() {
  const [duration, setDuration] = useState('');
  const [pointA, setPointA] = useState('');
  const [pointB, setPointB] = useState('');
  const [stops, setStops] = useState([]);
  const [stop, setStop] = useState('');
  const [showAddStop, setShowAddStop] = useState(false);
  const [showStops, setShowStops] = useState(false);


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
    const Bandra = "19.0583,72.8300"; 
    const points = [pointA];

    for (let i= 0; i<stops.length; i++){
        points.push(stops[i]);
    }
    points.push(pointB);
      
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


  
  return (
    <div className="App">
      <h1>Duration Calculator</h1>
      <div className="form-container">
        <div>
          <label>Point A (Latitude, Longitude):</label><br></br>
          <input
            type="text"
            value={pointA}
            onChange={(e) => setPointA(e.target.value)}
          />
        </div>
        

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

            </div>)}

           
          </div>
        )}

        








        <div>
          <label>Point B (Latitude, Longitude):</label><br></br>
          <input
            type="text"
            value={pointB}
            onChange={(e) => setPointB(e.target.value)}
          />
        </div>
        <button onClick={handleCalculateDuration} className='calculate'>Calculate Duration</button>
      </div>
      {duration && (
        <div className="result-container">
          <p>Duration: {duration}</p>
        </div>
      )}
    </div>
  );
}

export default AxiosAPI;
