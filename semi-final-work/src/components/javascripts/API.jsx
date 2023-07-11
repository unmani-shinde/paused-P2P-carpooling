import React, { useState } from 'react';

function API() {
    const [duration, setDuration] = useState('');
    const [pointA, setPointA] = useState('');
    const [pointB, setPointB] = useState('');

  const handleCalculateDistance = async () => {
    console.log(pointA);
    console.log(pointB);
    
    // const pointA = "40.7128,-74.0060"; // Latitude and longitude for Point A (New York City)
    // const pointB = "34.0522,-118.2437"; // Latitude and longitude for Point B (Los Angeles)
    const apiKey = 'd02bc9a1-766f-4ae3-8bfd-fa504dc406b7';
    // const query = new URLSearchParams({
    //     profile: 'car',
    //     point: JSON.stringify([pointA, pointB]),
    //     key: apiKey
    //   }).toString();
      
      const url = `https://graphhopper.com/api/1/route?point=${pointA}&point=${pointB}&vehicle=car&key=${apiKey}`;
      console.log(url);
      

    const resp = await fetch(
        `https://graphhopper.com/api/1/route?point=${pointA}&point=${pointB}&vehicle=car&key=${apiKey}`,
        { method: 'GET' }
      );
    const data = await resp.json();

    if (data.paths && data.paths.length > 0) {
      const calculatedTime = data.paths[0].time;
      const seccalculatedTime = Math.floor(calculatedTime/1000);
      const hours = Math.floor(seccalculatedTime / 3600);
      const minutes = Math.floor((seccalculatedTime % 3600) / 60);
      setDuration(`${hours} hours ${minutes} minutes`);
    } else {
      setDuration('Time calculation failed');
    }
  };

  return (
    <div className="App">
      <h1>Distance Calculator</h1>
      <div className="form-container">
        <div>
          <label>Point A (Latitude, Longitude):</label>
          <input
            type="text"
            value={pointA}
            onChange={(e) => setPointA(e.target.value)}
          />
        </div>
        <div>
          <label>Point B (Latitude, Longitude):</label>
          <input
            type="text"
            value={pointB}
            onChange={(e) => setPointB(e.target.value)}
          />
        </div>
        <button onClick={handleCalculateDistance}>Calculate Distance</button>
      </div>
      {duration && (
        <div className="result-container">
          <p>Duration: {duration}</p>
        </div>
      )}
    </div>
  );
}

export default API;