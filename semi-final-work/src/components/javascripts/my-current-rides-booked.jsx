import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import CurrentRides from './CurrentRides';
import '../stylesheets/UserDashboard.css';
import Web3 from 'web3';
import CommuteIOABI from "../ABI/contracttestingABI.json";
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';
const contractAddress = '0x9D66687E6Da2BC0A5444125A8fA389C3e96F1921';


function CurrentRide() {
  const { passengerID } = useParams();
  const history = useHistory();


  const [web3, setWeb3] = useState(null);
const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [passengerRequests, setPassengerRequests] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [rides, setRides] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let isHandlingEvent = false;
     // Added loading state

  useEffect(() => {
    const initialize = async () => {
      // Check if web3 is injected by the browser (Mist/MetaMask)
      if (typeof window.ethereum !== 'undefined') {
        try {
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

          for (let i = 1; i <= numRides; i++) {
            const rideDetails = await contract.methods.GetRideDetails((i)).call();
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
        RideDateandTime:rideDetails[9],
         isRideStarted:rideDetails[10],
         isRideEnded:rideDetails[11]
            });
          }

          setRides(ridesList);

          //   contract.events
          // .RideStarted()
          // .on('connected', () => {
          //   console.log('Connected to RideStarted event');
          // })
          // .on('data', handleRideStarted)
          // .off('data')
          // .on('error', (error) => {
          //   console.error('Error listening to RideStarted event:', error);
          // });
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
  }, [rides]);

  // function handleRideStarted(event) {
  //   if (isHandlingEvent) {
  //     return; // Do not execute the function if it's already being handled
  //   }

  //   else{
  //     const { rideId, isStarted } = event.returnValues;
  //     console.log(`RideStarted event received: rideId=${rideId}, isStarted=${isStarted}`);   
      
  //     if (rides.length > 0) {
  //       let updatedRides = [];
  //       rides.forEach(ride => {
  //         if (ride.RideID !== rideId) {
  //           updatedRides.push(ride);
  //         } else {
  //           var newRide = Object.assign({}, ride);
  //           newRide.isRideStarted = true;
  //           updatedRides.push(newRide);
  //         }
  //       });
      
  //       // Update the rides state with the updated array
  //       console.log("Ride details have been updated.");
  //       console.log(updatedRides);
  //       setRides(updatedRides);
  //       console.log(rides);

  //       setIsLoading(false);
        
  //     }
      
      
      
        
  
  // }}

  const loadRides = async (contract) => {
    setIsLoading(true);
    const numRides = await contract.methods. GetnumRides().call();
          let ridesList = [];

          for (let i = 1; i <= numRides; i++) {
            const rideDetails = await contract.methods.GetRideDetails(i).call();
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
          setIsLoading(false);
    
  };
  

  const handleLogin = (rideid) => {
    // Store the passengerID in state or local storage
    // Example: setPassengerID(passengerID);
    history.push(`/viewselectedupcomingride/${passengerID}/${rideid}`);

  };

  const handleTesting = () => {
    const rideid = 2;
    console.log(typeof(rides[rideid-1].isRideStarted),rides[rideid-1].isRideStarted);

  };



  return (

    <div>{!isLoading && ( 

    <div>
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

<div style={{display:"flex",flexDirection:"column",marginLeft:"2vh",marginTop:"13vh", alignSelf:"center", border:"1px solid black", width:"98vw", height:"84vh"}}>
  <div style={{display:"fex",flexDirection:"column",alignSelf:"center", border:'solid 1px black',width:"30vw",backgroundColor:"#FEFEFA",marginTop:"-2vh"}}>
    <h5 style={{fontWeight:"700", color:"black", fontSize:"x-large",textAlign:'center',width:"30vw"}}>My Current Rides in Progress</h5>
    
    </div>
  <div>
    <table style={{marginTop:"1vh"}}>
      <tbody>
      {rides.length > 0 && rides.map((ride) => (
  <div key={ride.RideID}>
    {((ride.HostID === passengerID || ride.PeersID.includes(passengerID)) && !(ride.isRideEnded)) && (
      <tr>
        <td>
          <div style={{ backgroundColor: "#FEFEFA", width: "96vw", marginLeft: "1vw", height: "8vh", marginBottom: "2vh", display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "row", marginTop: "2vh", paddingLeft: "2vh" }}>
              <h5 style={{ fontWeight: "700", fontSize: "large", color: "black" }}>Ride ID: </h5>
              <p style={{ fontSize: "large", color: "black", paddingLeft: "0.5vh" }}>{ride.RideID}</p>
            </div>
            <div style={{ width: "8vw", display: "flex", flexDirection: "row", marginTop: "2vh", paddingLeft: "10vw" }}>
              <h5 style={{ fontWeight: "700", fontSize: "large", color: "black" }}>Role: </h5>
              <p style={{ fontSize: "large", color: "black", paddingLeft: "0.5vh" }}>{ride.HostID === passengerID ? "Host" : "Passenger"}</p>
            </div>
            <div style={{ width: "40vw", display: "flex", flexDirection: "row", marginTop: "2vh", marginLeft: "10vw" }}>
              <h5 style={{ fontWeight: "700", fontSize: "large", color: "black", marginLeft: "10vw" }}>Ride Status: </h5>
              <p style={{ fontSize: "large", color: "black", paddingLeft: "0.5vh" }}>{ride.isRideStarted ? "Started" : "Not started"}</p>
            </div>
            <div style={{ width: "30vw", display: "flex", flexDirection: "row", marginTop: "2vh", marginLeft: "-10vw" }}>
              <button
                style={{ backgroundColor: "#116D6E", fontWeight: "700", fontSize: "large", color: "white", marginLeft: "15vw", marginRight: "-6vw", marginTop: "-1vh", height: "6vh", width: "20vw" }}
                onClick={() => handleLogin(ride.RideID)}
              >
                View Ride Details
              </button>
            </div>
          </div>
        </td>
      </tr>
    )}

  </div>
))}

      
      
      </tbody>
    </table>
  </div>

  
    
    </div>





  {/* <div className="outercover" style={{alignSelf:"center", width:"98vw"}}>
  <div className="PeersOnRide">
      <div className="MainRider" style={{height:"30vh",maxHeight:"30vh",width:"27vw", maxWidth:"27vw",overflowX:"scroll"}}>
          <div style={{fontSize:"30px",fontWeight:"bold",paddingBottom:"10px"}}>Aishwarya's Ride</div>
          <div><b>Ride ID: </b></div>
          <div><b>Source: </b></div>
          <div><b>Destination: </b></div>
      </div>
      <div className="HOSTID" style={{marginTop:"2vh"}}>
          <button className="Hostbtn" style={{width:"27vw", marginLeft:"0vw", fontWeight:"700", marginBottom:"-1vh", textAlign:"left", paddingLeft:"3vh"}}>Host: Aishwarya(PassID)</button>
      </div>
      <div className="OtherPeopleRide">
          <div style={{fontSize:"30px",fontWeight:"bold",height:"30vh",maxHeight:"30vh", marginBottom:"-22vh", paddingTop:"1vh"}}>Peers On this Ride:</div>
          <div>Unmani Shinde- PassID:</div>
          <div>Soham Lad- PassID:</div>
      </div>
     

  </div>

  <div className="TrackCarpool">
      <div style={{fontSize:"30px",fontWeight:"bold",paddingLeft:"10px",paddingTop:"10px"}}>Track Your Carpool</div>
  </div>

  <div className="AbsoluteRight">
      <div className="RideUpdate">
          <h1 style={{color:"black"}}>Ride Updates</h1>
          <div style={{paddingTop:"20px"}}>
          <p>Unmani joined the pool at Andheri.</p><br/>
          <p>Soham joined the pool at Vasai.</p>
          </div>
          
      </div>
      <div className="TravelTime">
          <div style={{fontSize:"30px",fontWeight:"bold"}}>Total Journey Time</div>
          <div style={{paddingTop:"10px",fontSize:"20px"}}>6 hours 3 minutes</div>
      </div>
      <div className="EstimatedArrival">
          <div style={{fontSize:"30px",fontWeight:"bold"}}>Estimated Arrival</div>
          <div style={{paddingTop:"10px",fontSize:"20px"}}>2 hours 13 minutes</div>
      </div>
      <div className="MarkJoinDrop">
      
              <button className="Hostbtn" style={{textAlign:"center", fontWeight:"700"}}>I have Joined</button>

      </div>
  </div>
  </div> */}
  
  </div>
  )}
  
  {isLoading && (<div className="loading-spinner">
      <div className="spinner"></div>
    </div>)}
  
  </div>
    
   
  );
}

export default CurrentRide;
