import React, { useState, useEffect, useMemo} from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useRef } from 'react';
import L,{icon} from "leaflet";
import { useMap } from "react-leaflet";
import { useHistory } from 'react-router-dom';
import '../stylesheets/UserDashboard.css';
import { FaStar } from 'react-icons/fa';
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import appendAllarray from '../actions/allarrayActions';
import CommuteIOABI from "../ABI/contracttestingABI.json";
const contractAddress = '0xba05DB2318CfF5E2641a88B5745D7Fd66B31813B';

function Test({ sourceAddress, destinationAddress }) {
    const  passengerID = 2;
    const dispatch = useDispatch();

   

    const position = [20.5, 78.9];
      
        const [web3, setWeb3] = useState(null);
        const [accounts, setAccounts] = useState([]);
        const [contract, setContract] = useState(null);
        const [passengerRequests, setPassengerRequests] = useState([]);
        const [passengers, setPassengers] = useState([]);
        const [rides, setRides] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [date, setDate] = useState('');
        const [time, setTime] = useState('');
        const [source, setSource] = useState('');
        const [destination, setDestination] = useState('');
        const [stops, setStops] = useState([]);
        const [host, setHost] = useState('');
        const [fare, setFare] = useState('');
        const [seats, setSeats] = useState('');
        const [selectSource, setSelectSource] = useState("");
  const [selectDestination, setSelectDestination] = useState("");
  const routingControlRef = useRef(null);

  const map = useMap();
  useMemo(() => {
  
    const control=L.Control.geocoder({
      defaultMarkGeocode: true,
      placeholder: 'Enter a location',
    }).addTo(map)

    const directions = L.Routing.control({
      waypoints: [
        L.latLng(selectSource.lat, selectSource.lng), 
        L.latLng(selectDestination.lat, selectDestination.lng),
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
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      
    }).addTo(map);


      control.on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        console.log(latlng)
        map.fitBounds(e.geocode.bbox);

        if (!selectSource) {
          setSelectSource(latlng);
          //dispatch(setSourceAddress(latlng));
        } else if (!selectDestination) {
          setSelectDestination(latlng);
          //dispatch(setDestinationAddress(latlng));
        }else {
          setSelectSource(null);
          setSelectDestination(null);
          routingControlRef.current.setWaypoints([]);
        }

        if (selectSource && selectDestination) {
          routingControlRef.current.setWaypoints([selectSource, selectDestination]);
        }
      
      });

      return () => {
        control.removeFrom(map);
        directions.removeFrom(map);
      };
      
      
      
  }, [map,selectSource, selectDestination]);

        useEffect(() => {
          // Code to execute when sourceAddress or destinationAddress changes
          console.log("sourceAddress:", sourceAddress);
          console.log("destinationAddress:", destinationAddress);
        }, [sourceAddress, destinationAddress]);
       
    useEffect(() => {
      const initialize = async () => {
        // Check if web3 is injected by the browser (Mist/MetaMask)
        if (typeof window.ethereum !== 'undefined') {
          try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);
            setWeb3(web3);
  
            // Get the user's accounts
            const accounts = await web3.eth.getAccounts();
            setAccounts(accounts);
  
            // Get the contract instance
            const contract = new web3.eth.Contract(CommuteIOABI, contractAddress);
            setContract(contract);
  
            // Load the passenger requests
            // await loadPassengerRequests(contract);
            // // Load the passenger details
            const numPassengers = await contract.methods.GetnumPassengers().call();
            let passengersList = [];
        
            for (let i = 0; i < numPassengers; i++) {
              const passengerDetails = await contract.methods.GetPassDetails((i+1)).call();
              passengersList.push({
                PassID: passengerDetails[0],
                PassName: passengerDetails[1],
                PassWalletAddress: passengerDetails[2],
                PassHomeAddress: passengerDetails[3],
                PassEMail: passengerDetails[9],
                PassVehicleName: passengerDetails[10],
                PassVehicleNumber: passengerDetails[11],
                PassVehicleDetailsHash: passengerDetails[4],
                PassGender: passengerDetails[5],
                PassReview: passengerDetails[6],
                PassRidesHosted: passengerDetails[7],
                PassRidesTaken: passengerDetails[8],
              });
            }
        
            setPassengers(passengersList);

            const numRides = await contract.methods.GetnumRides().call();
            let ridesList = [];
  
            for (let i = 0; i < numRides; i++) {
              const rideDetails = await contract.methods.GetRideDetails((i+1)).call();
              ridesList.push({
                 RideID:rideDetails[0],
                 RideSourceLocation:rideDetails[1],
                 RideDestinationLocation:rideDetails[2],
                 HostID:rideDetails[3],
                 PeersID:rideDetails[4],
                 Stops:rideDetails[5],
                 RideFare:rideDetails[6],
                 RideSeatsAvailable:rideDetails[7],
           isRideAvailable:rideDetails[8],
          RideDate:rideDetails[9],
          RideStartTime:rideDetails[10],
           isRideStarted:rideDetails[11],
           isRideEnded:rideDetails[12]
              });
            }
  
            setRides(ridesList);
  
            setIsLoading(false);
  
          } catch (error) {
            console.error('Error initializing Web3:', error);
            alert('An error occurred while initializing Web3. Please make sure you have MetaMask installed and try again.');
          }
        } else {
          console.log('Please install MetaMask!');
        }
      };
  
      initialize();
    }, []);

    
  

    const handleCreateRide = async () => {
    
          // Convert date and time to an array
          const dateAndTime = [date, time];
    
          // Convert stops to an array
          const stopsArray = stops.split(',');

          let rideData = [source, destination];
          stopsArray.forEach(stop => {
            rideData.push(stop); // Append each stop element to the rideData array
          });        
          // Call the CreateARide function in the smart contract
          await contract.methods.CreateARide(dateAndTime, source, destination, stopsArray, passengerID, fare, seats).send({ from: accounts[0] });
          dispatch(appendAllarray(rideData));

          // Reset the form
          setDate('');
          setTime('');
          setSource('');
          setDestination('');
          setStops('');
          setHost('');
          setFare('');
          setSeats('');
    
          console.log('Ride created successfully.');
        }
    
   
        const getVehicleURL = async (passreqid) =>{
    
          const [CID,filename] = passengerRequests[passreqid-1].PassVehicleDetailsHash.split(";");
          const baseWeb3StorageUrl = 'https://ipfs.io/ipfs/';
          const file = `/${filename}`;
          const URL = `${baseWeb3StorageUrl}${CID}${file}`; 
          return URL;
      
        }
  
    
  

    // Retrieve passenger details using passengerID from the smart contract or API
  
    return (

      <div>
        <div style={{display:'flex', flexDirection:'column'}}>
            <div className="MyNavbar">
    <a href='/' style={{border:"none"}}><h3 style={{fontWeight:"700", fontSize:"xx-large", fontFamily:"Poppins", marginTop:"-1vh"}}>COMMUTE.IO</h3></a>
  <button className='i-know-this-class-of-buttons-doesnt-exist'><Link style={{color:'#116D6E'}} to={`/dashboard/${passengerID}`} className="profile">
    <FaUser style={{marginRight:"0.5vw", transform:"scale(1.25)"}} />Profile
  </Link></button>
  <button className='i-know-this-class-of-buttons-doesnt-exist'><Link style={{color:'#116D6E'}}to={`/myinprogressrides/${passengerID}`} className="CurrentRide">
    <FaCar style={{marginRight:"0.5vw", transform:"scale(1.25)"}} />Current Ride
  </Link></button>
  <button className='i-know-this-class-of-buttons-doesnt-exist' ><Link style={{color:'#116D6E'}} to={`/ridehistory/${passengerID}`} className="History">
    <FaHistory style={{marginRight:"0.5vw", transform:"scale(1.25)"}} />History
  </Link></button>
  <button className='i-know-this-class-of-buttons-doesnt-exist'><Link style={{color:'#116D6E'}} to={`/enterRideInbox/${passengerID}`} className="Inbox">
    <FaEnvelope style={{marginRight:"0.5vw", transform:"scale(1.25)"}} />Inbox
  </Link></button>
  <button className='i-know-this-class-of-buttons-doesnt-exist'><Link style={{color:'#116D6E'}}to={`/viewallrides/${passengerID}`} className="CheckRides">
    <FaCar style={{marginRight:"0.5vw", transform:"scale(1.25)"}} />Check Rides
  </Link></button>
  <button className='i-know-this-class-of-buttons-doesnt-exist' ><Link  style={{color:'#116D6E'}} to={`/startaride/${passengerID}`} className="StartRide">
    <RiCaravanFill style={{marginRight:"0.5vw", transform:"scale(1.25)"}}/>Start A Ride
  </Link></button>
</div>

<h1 style={{marginTop:"12vh",marginLeft:"550px",color:"black"}}>Where do you want to go today?</h1>
<div style={{display:'flex', flexDirection:"row"}}>
<div style={{border:"solid 1px black",display:'flex',flexDirection:'column', width:"40vw",height:"80vh", marginLeft:'1vh'}}>
<div style={{ display:"flex", flexDirection:'row', width:"50vw", marginLeft:"1vh"}}>

<table>
  <tbody>
    <tr style={{height:'8vw'}}>
      <td><label>Date:</label></td>
      <td><input type="text" value={date} onChange={(e) => setDate(e.target.value)} style={{width:"10vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>
    </tr>
    <tr style={{height:'8vw'}}>
      <td><label>Time:</label></td>
      <td><input type="text" value={time} onChange={(e) => setTime(e.target.value)} style={{width:"10vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>
    </tr>

    <tr style={{height:'8vw'}}>
      <td><label>Host ID:</label></td>
      <td><input type="text" value={passengerID} readOnly style={{width:"10vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}}/></td>
    </tr>

    <tr style={{height:'8vw'}}>
      <td><label>Ride Fare:</label></td>
      <td><input type="text" value={fare} onChange={(e) => setFare(e.target.value)} style={{width:"10vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>
    </tr>
  </tbody>
</table>

<table>
  <tbody>
    <tr style={{height:'8vw'}}>
      <td style={{width:"5vw"}}><label>Source Location:</label></td>
      <td><input type="text" value={source} onChange={(e) => setSource(e.target.value)} style={{width:"16vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>     
    </tr>
    <tr style={{height:'8vw'}}>
      <td><label>Destination Location:</label></td>
      <td><input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} style={{width:"16vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>
    </tr>
    <tr style={{height:'8vw'}}>
      <td><label>Stops (comma-separated):</label></td>
      <td><input type="text" value={stops} onChange={(e) => setStops(e.target.value)} style={{width:"16vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>
    </tr>
    <tr style={{height:'8vw'}}>
      <td><label>Ride Seats Available:</label></td>
      <td><input type="text" value={seats} onChange={(e) => setSeats(e.target.value)} style={{width:"16vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>
    </tr>
  </tbody>
</table>      
</div><br></br>

        <div style={{alignSelf:'center', marginTop:"-3vh"}}>
  <button className='ridebtn' onClick={handleCreateRide} style={{marginLeft:"-3vw",alignSelf:'center',marginTop:"10px",marginBottom:"5vh",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)", width:"8vw"}}
           onMouseEnter={(e) => (e.target.style.backgroundColor = "#39a3a5")}
           onMouseLeave={(e) => (e.target.style.backgroundColor = "")}>Create Ride</button>
  </div>


</div>
<div style={{border:"solid 1px black", marginLeft:'1vh', width:"58.5vw"}}>




  </div>

</div>

    </div>
      </div>


      
  )
  
  }

  let DefaultIcon = L.icon({
    iconUrl: "./blueicon.png",
    iconSize: [50, 50],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  
  export default Test;