import React, { useState, useEffect } from 'react';
import './home.css';
import Web3 from 'web3';
import axios from 'axios';

const web3 = new Web3(window.ethereum);

const Home = () => {
  const [userLocation, setUserLocation] = useState({
    source: '',
    destination: '',
  });

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const handleInputs = e => {
    setUserLocation({ ...userLocation, [e.target.name]: e.target.value });
  };

  const bookRide = async () => {
    try {
      await window.ethereum.enable();
      const Carpooling = require('../../assets/Carpooling.json'); // Contract ABI
      const contract = new web3.eth.contract(Carpooling.abi, Carpooling.address);
      const accounts = await web3.eth.getAccounts();
      const rideId = 0;
      const gasAmount = await contract.methods.bookRide(rideId).estimateGas({ from: accounts[0] });
      await contract.methods.bookRide(rideId).send({ from: accounts[0], gas: gasAmount });
      console.log("Ride Booked!")
    } catch (error) {
      console.error(error);
    }
  };

  const API=async()=>{

    const options = {
        method: 'GET',
        url: 'https://taxi-fare-calculator.p.rapidapi.com/search-geo',
        params: {dep_lat: '19.1176', dep_lng: '72.9060', arr_lat: '19.1193', arr_lng: '72.9116'},
        headers: {
            'X-RapidAPI-Key': 'e7d7614529mshf3b0e6977befcc6p13700fjsn7c359e421cda',
            'X-RapidAPI-Host': 'taxi-fare-calculator.p.rapidapi.com',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*'
        }
        };
    
        axios.request(options).then(function (response) {
            console.log(response.data);
            console.log(typeof response.data.journey)
            let finalfare=response.data.journey.fares[0].price_in_cents
            console.log(finalfare)
            setResponse(response.data.journey.fares[0].price_in_cents);
    
        }).catch(function (error) {
            console.error(error);
        });
}


  return (
    <section className="home">
      <div className="secContainer container">
        <div className="homeText">
          <h1 className="title">Book Your First Ride Now!</h1>
          <p className="subTitle">Travelling Made Easy</p>
          <button className="btn">
            <a href="#">Explore Now</a>
          </button>
        </div>
        <div className="homeCard grid">
          <div className="locationDiv">
            <label htmlFor="location">Source</label>
            <input
              type="text"
              name="source"
              value={userLocation.source}
              onChange={handleInputs}
              placeholder="Your Current Location"
            />
          </div>
          <div className="locationDiv">
            <label htmlFor="distance">Destination</label>
            <input
              type="text"
              name="destination"
              value={userLocation.destination}
              onChange={handleInputs}
              placeholder="Your Destination"
            />
          </div>
          <div className="locationDiv">
                        <label htmlFor='price'>Charges(in Rs.)</label>
                        <input type="text" placeholder={response}/>
                    </div>
                    <btn className='btn' onClick={API}>
                        Search
                    </btn>
          <button className="btn" onClick={bookRide}>
            Book Now!
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
