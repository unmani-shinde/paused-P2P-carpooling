import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
// import '../stylesheets/UserDashboard.css';
// import "../App.css"
import { FaStar } from 'react-icons/fa';
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CommuteIOABI from "./components/contracttestingABI.json"
const contractAddress = '0xba05DB2318CfF5E2641a88B5745D7Fd66B31813B';
 
 
function StartARide() {
    const  {passengerID}  = useParams();
 
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
 
       // Added loading state
 
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
 
          // Call the CreateARide function in the smart contract
          await contract.methods.CreateARide(dateAndTime, source, destination, stopsArray, passengerID, fare, seats).send({ from: accounts[0] });
 
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
      const URL = "https://"+CID+".ipfs.w3s.link/"+filename;
      const URL2 = decodeURIComponent(URL);    
      return URL2;
 
    }
 
 
 
 
    // Retrieve passenger details using passengerID from the smart contract or API
 
    return (
      <div> {!(isLoading) && ( 
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
        <div className='purapuradiv' style={{marginTop:"20px",width:"600px",marginLeft:"20px"}}>
      <h1 style={{color:"black",marginBottom:"12px",marginLeft:"200px"}}>Create a Ride</h1>
      {!isLoading && (
        <div>
            <div style={{display:"flex",gap:"40px"}}>
          <div>
            <label>Date:</label>
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} style={{width:"300px",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} />
          </div>
          <div>
            <label>Time:</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} style={{width:"300px",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} />
          </div>
          </div>
          <div style={{display:"flex",gap:"40px"}}>
          <div>
            <label>Source Location:</label>
            <input type="text" value={source} onChange={(e) => setSource(e.target.value)} style={{width:"300px",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} />
          </div>
          <div>
            <label>Destination Location:</label>
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} style={{width:"300px",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} />
          </div>
          </div>
          <div style={{display:"flex",gap:"40px"}}>
          <div>
            <label>Stops (comma-separated):</label>
            <input type="text" value={stops} onChange={(e) => setStops(e.target.value)} style={{width:"300px",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} />
          </div>
          <div>
            <label>Host ID:</label>
            <input type="text" value={passengerID} readOnly style={{width:"300px",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}}/>
          </div>
          </div>
          <div style={{display:"flex",gap:"40px"}}>
          <div>
            <label>Ride Fare:</label>
            <input type="text" value={fare} onChange={(e) => setFare(e.target.value)} style={{width:"300px",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} />
          </div>
          <div>
            <label>Ride Seats Available:</label>
            <input type="text" value={seats} onChange={(e) => setSeats(e.target.value)} style={{width:"300px",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}} />
          </div>
          </div>
          <button className='ridebtn' onClick={handleCreateRide} style={{marginLeft:"250px",marginTop:"10px",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"}}
           onMouseEnter={(e) => (e.target.style.backgroundColor = "#39a3a5")}
           onMouseLeave={(e) => (e.target.style.backgroundColor = "")}>Create Ride</button>
        </div>
      )}
    </div>
    </div>
 
  )}
 
  {isLoading && (<div className="loading-spinner">
        <div className="spinner"></div>
      </div>)}
 
  </div>
  )
 
  }
 
  export default StartARide;