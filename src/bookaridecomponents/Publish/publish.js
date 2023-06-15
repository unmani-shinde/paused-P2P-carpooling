import React, { useState, useEffect } from 'react';
import './publish.css'
import sideImg from "../../assets/Images/book cab.jpg"

import Web3 from 'web3';
import axios from 'axios';

const web3 = new Web3(window.ethereum);
 

const Publish =()=>{
const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [fare, setFare] = useState('');
  const [seats, setSeats] = useState('');
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');


  const createRide = async () => {
    try {
      await window.ethereum.enable();
      const contractAddress ="0xac26c6071624440190fe753091b6ad87cad074db";
      const abi = [
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "rideId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "payment",
                  "type": "uint256"
                }
              ],
              "name": "bookRide",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "string",
                  "name": "_origin",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "_destination",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "_departuretime",
                  "type": "uint256"
                },
                {
                  "internalType": "uint8",
                  "name": "_fare",
                  "type": "uint8"
                },
                {
                  "internalType": "uint8",
                  "name": "_seats",
                  "type": "uint8"
                }
              ],
              "name": "createride",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "string",
                  "name": "_name",
                  "type": "string"
                },
                {
                  "internalType": "uint8",
                  "name": "_age",
                  "type": "uint8"
                },
                {
                  "internalType": "bool",
                  "name": "_gender",
                  "type": "bool"
                }
              ],
              "name": "newUser",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "rideId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "seats",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "passenger",
                  "type": "address"
                }
              ],
              "name": "rideBooked",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "rideId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "string",
                  "name": "origin",
                  "type": "string"
                },
                {
                  "indexed": false,
                  "internalType": "string",
                  "name": "destination",
                  "type": "string"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "departuretime",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "fare",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "seats",
                  "type": "uint256"
                }
              ],
              "name": "rideCreated",
              "type": "event"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "addressDetails",
              "outputs": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "uint8",
                  "name": "age",
                  "type": "uint8"
                },
                {
                  "internalType": "bool",
                  "name": "gender",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "person",
              "outputs": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "uint8",
                  "name": "age",
                  "type": "uint8"
                },
                {
                  "internalType": "bool",
                  "name": "gender",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "ridecount",
              "outputs": [
                {
                  "internalType": "uint8",
                  "name": "",
                  "type": "uint8"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "rideowner",
              "outputs": [
                {
                  "internalType": "address payable",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "rides",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "rideId",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "origin",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "destination",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "departuretime",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "fare",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "seats",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "rideToRider",
              "outputs": [
                {
                  "internalType": "address payable",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }
          ]
    const contract = new web3.eth.Contract(abi, contractAddress);
          const accounts = await web3.eth.getAccounts();
          const rideId = 0;
          const origin = "Powai";
          const destination = "Hiranandani";
          const departureTime = 1600000000;
          const fare = 10;
          const seats = 5;
          const amtpayable = 113;
          const gasAmount = await contract.methods.createride(origin, destination,departureTime,fare,seats).estimateGas({ from: accounts[0] });     
          await contract.methods.createride(origin, destination,departureTime,fare,seats).send({ from: accounts[0], gas: gasAmount });
          console.log("Ride Published!")
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
    
    return(
        <section className='publish'>
            <div className='secContainer container'>
                <div className='publishText'>
                    <h2>Planning to Publish Your Own Ride?</h2>
                    <h4> You won't find a better place than this,Hop In!</h4>
                    <div className='sideImage'>
                        <img src={sideImg}alt='taxi car'/>
                    </div>
                    
                </div>
                <div className='publishBtn'>
                    <button className='btn'>Offer Ride</button>
                </div>
                <div className='publishCard grid'>
                    <div className="locationDiv">
                        <label htmlFor='location'>Source</label>
                        <input type="text" placeholder='Your Current Location'/>
                    </div>

                    <div className="locationDiv">
                        <label htmlFor='distance'>Destination</label>
                        <input type="text" placeholder='Your Destination'/>
                    </div>

                    <div className="locationDiv">
                        <label htmlFor='price'>Charges</label>
                        <input type="text" placeholder='Rupees 10/Meter'/>
                    </div>
                    <button className='btn' onClick={createRide}>
                        Publish!
                    </button>
                </div>

            </div>




        </section>

        )
    }

export default Publish;