
import React, { useState, useEffect, useMemo, useContext} from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L,{icon} from "leaflet";
import LeafletGeocoder from './LeafletGeocoder.jsx';
import { useMap } from "react-leaflet";
import { useHistory } from 'react-router-dom';
import '../stylesheets/UserDashboard.css';
import { FaStar } from 'react-icons/fa';
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import appendAllarray from './actions/allarrayActions.js';
import CommuteIOABI from "../ABI/contracttestingABI.json";
const contractAddress = '0x303b3f8D8b2832A2044cb404Efe326d300BF590C';


function StartARide() {
    const  {passengerID}  = useParams();
    const dispatch = useDispatch();

    const sourceAddress = useSelector((state) => state.sourceAddress); 
    const destinationAddress = useSelector((state) =>state.destinationAddress);
    const listStops = useSelector((state=>state.stops));
     

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
        const [allStopsAvailable, setAllStopsAvailable] = useState([]);


       
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
           RideUpdates:rideDetails[8],
          RideDate:rideDetails[9],
          RideStartTime:rideDetails[10],
           isRideStarted:rideDetails[11],
           isRideEnded:rideDetails[12]
              });
            }
  
            setRides(ridesList); 

            const allstopsList = await contract.methods.getAllStopsAvailable().call();
            setAllStopsAvailable(allstopsList);

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
      const selectedDate = new Date(date);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1; // Months are zero-based, so we add 1
      const day = selectedDate.getDate();

      // Construct the string representation of the date
      const dateString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

      const dateAndTime = [dateString, time];
      let stopsArray = [];
    
      if (listStops.length > 0) {
        stopsArray = listStops.split(';');
      }
    
      let rideData = [sourceAddress, destinationAddress];
    
      if (stopsArray.length > 0) {
        stopsArray.forEach(stop => {
          rideData.push(stop); // Append each stop element to the rideData array
        });
      }
      await contract.methods.CreateARide(dateAndTime, sourceAddress, destinationAddress, stopsArray, passengerID, fare, seats).send({ from: accounts[0] });
      await contract.methods.UpdateAllStopsAvailable(rideData).send({ from: accounts[0] });
      console.log("Data sent successfully.");
      //dispatch(appendAllarray(rideData));
      
      // var temp = await contract.methods.getAllStopsAvailable().call();
      // var hehehaha = Object.values(temp); // Convert object to an arra
      // console.log(hehehaha);
      // rideData.forEach((element) => {
      //   if (!(hehehaha.includes(element))) {
      //     hehehaha.push(element);
      //   }
      // });

      // console.log(temp);   
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
    };
    
    
   
    const getVehicleURL = async (passreqid) =>{
      
      const [CID,filename] = passengerRequests[passreqid-1].PassVehicleDetailsHash.split(";");
      const URL = "https://"+CID+".ipfs.w3s.link/"+filename;
      const URL2 = decodeURIComponent(URL);    
      return URL2;
  
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
  <button className='i-know-this-class-of-buttons-doesnt-exist'><Link style={{color:'#116D6E'}} to="/inbox" className="Inbox">
    <FaEnvelope style={{marginRight:"0.5vw", transform:"scale(1.25)"}} />Inbox
  </Link></button>
  <button className='i-know-this-class-of-buttons-doesnt-exist'><Link style={{color:'#116D6E'}}to={`/viewallrides/${passengerID}`} className="CheckRides">
    <FaCar style={{marginRight:"0.5vw", transform:"scale(1.25)"}} />Check Rides
  </Link></button>
  <button className='i-know-this-class-of-buttons-doesnt-exist' ><Link  style={{color:'#116D6E'}} to={`/startaride/${passengerID}`} className="StartRide">
    <RiCaravanFill style={{marginRight:"0.5vw", transform:"scale(1.25)"}}/>Start A Ride
  </Link></button>
</div>

<h1 style={{marginTop:"9.5vh",textAlign:'center',color:"black"}}>Where do you want to go today?</h1>
<h3 style={{ color:'black', textAlign:'center', fontWeight:'400', marginTop:"-1vh"}}>Customize your voyage effortlessly by designating the source, destination, and layovers of your choice, and click "Update".</h3>
<div style={{display:'flex', flexDirection:"row"}}>
<div style={{border:"solid 1px black",display:'flex',flexDirection:'column', width:"40vw",height:"80vh", marginLeft:'1vh'}}>
<div style={{ display:"flex", flexDirection:'row', width:"50vw", marginLeft:"1vh"}}>

<table>
  <tbody>
    <tr style={{height:'8vw'}}>
      <td><label>Date:</label></td>
      <td><input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{width:"10vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>
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
      <td><input type="number" value={fare} onChange={(e) => setFare(e.target.value)} style={{width:"10vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>
    </tr>
  </tbody>
</table>

<table>
  <tbody>
    <tr style={{height:'8vw'}}>
      <td style={{width:"5vw"}}><label>Source Location:</label></td>
      <td><input type="text" value={sourceAddress} onChange={(e) => setSource(e.target.value)} style={{width:"16vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>     
    </tr>
    <tr style={{height:'8vw'}}>
      <td><label>Destination Location:</label></td>
      <td><input type="text" value={destinationAddress} onChange={(e) => setDestination(e.target.value)} style={{width:"16vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>
    </tr>
    <tr style={{height:'8vw'}}>
      <td><label>Stops (comma-separated):</label></td>
      <td><input type="text" value={listStops} onChange={(e) => setStops(e.target.value)} style={{width:"16vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>
    </tr>
    <tr style={{height:'8vw'}}>
      <td><label>Ride Seats Available:</label></td>
      <td><input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} style={{width:"16vw",marginRight:"0.5vw",marginTop:"1vw",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} /></td>
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
<div style={{border:"solid 1px black", marginLeft:'1vh', width:"58.5vw", paddingTop:"40vh"}}>
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
  
  export default StartARide;