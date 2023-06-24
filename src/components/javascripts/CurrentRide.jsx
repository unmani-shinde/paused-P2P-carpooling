import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import CurrentRides from './CurrentRides';
import '../stylesheets/UserDashboard.css';
import Web3 from 'web3';
import CommuteIOABI from "../ABI/contracttestingABI.json";
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';
const contractAddress = '0x303b3f8D8b2832A2044cb404Efe326d300BF590C';

function CurrentRide() {
  const { passengerID, rideID } = useParams();

  const [web3, setWeb3] = useState(null);
const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [passengerRequests, setPassengerRequests] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [rides, setRides] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMarkButtonDisabled, setIsMarkButtonDisabled] = useState(false);
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

          const numRides = await contract.methods. GetnumRides().call();
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
        RideDateandTime:rideDetails[9],
         isRideStarted:rideDetails[10],
         isRideEnded:rideDetails[11]
            });
          }

          setRides(ridesList);
          console.log(rides);
          // const obj = await contract.methods.GetRidePassengersDetails(rideID).call();
          // console.log(obj);
          // setRidePassengers(obj);          
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


  const handleMarkMyJoiningandLeaving = async (event) => {
    event.preventDefault();
  
    if (!(rides[rideID - 1].isRideStarted) && !(rides[rideID - 1].HostID === passengerID)) {
      alert("Please wait for the host to start this ride.");
    } else if (rides[rideID - 1].isRideEnded) {
      alert("The Host has ended this ride for everyone.");
    } else {
      try {
        const ridePassengers = await contract.methods.GetRidePassengersDetails(rideID, passengerID).call();
        console.log(ridePassengers);

        if(passengerID==rides[rideID-1].HostID && rides[rideID-1].isRideStarted==false){
          await contract.methods.MarkPassengeerJoining(passengerID, rideID, rides[rideID-1].RideSourceLocation).send({ from: accounts[0] });
        }

        else if (passengerID==rides[rideID-1].HostID && rides[rideID-1].isRideEnded==false && rides[rideID-1].isRideStarted==true){
          await contract.methods.MarkPassengerLeaving(passengerID, rideID, rides[rideID-1].RideDestinationLocation).send({ from: accounts[0] });
          setIsMarkButtonDisabled(true);
        }
  
        else if (ridePassengers[0] != "" && ridePassengers[1] != "" && ridePassengers[2] === false) {
          // PassID matches and is not on the ride, call MarkPassengeerJoining
          const sourceLoc = ridePassengers[0];
          const destLoc = ridePassengers[1];
          const gasAmount = await contract.methods.MarkPassengeerJoining(passengerID, rideID, sourceLoc).estimateGas({from:accounts[0]});
          await contract.methods.MarkPassengeerJoining(passengerID, rideID, sourceLoc).send({ from: accounts[0],gas:(gasAmount+10000) });
          console.log("MarkPassengeerJoining called");
        } else if (ridePassengers[0] != "" && ridePassengers[1] != "" && ridePassengers[2] === true) {
          //PassID matches and is already on the ride, call MarkPassengerLeaving
          await contract.methods.MarkPassengerLeaving(passengerID, rideID, ridePassengers[1]).send({ from: accounts[0] });
          console.log("MarkPassengerLeaving called");
        } else {
          console.log("Passenger not found in ride passengers list");
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error
      }
    }
  };
  
  
  
  return (

    <div>{!isLoading && ( <div> 
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
    
    <div className="outercover" style={{alignSelf:"center", width:"98vw"}}>
  <div className="PeersOnRide">
      <div className="MainRider" style={{height:"30vh",maxHeight:"30vh",width:"27vw", maxWidth:"27vw",overflowX:"scroll"}}>
          <div style={{fontSize:"30px",fontWeight:"bold",paddingBottom:"10px"}}>{passengers[passengerID-1].PassName.split(" ")[0]}'s Ride</div>
          <div><b>Ride ID: </b>{rideID}</div>
          <div><b>Source: </b>{rides[rideID-1].RideSourceLocation}</div>
          <div><b>Destination: </b>{rides[rideID-1].RideDestinationLocation}</div>
      </div>
      <div className="HOSTID" style={{marginTop:"2vh"}}>
          <button className="Hostbtn" style={{width:"27vw",height:"10vh",maxHeight:"10vh",overflowX:"scroll",overflowY:"hidden", marginLeft:"0vw", fontWeight:"700", marginBottom:"-1vh", textAlign:"left", paddingLeft:"1vh"}}><span style={{ whiteSpace: "nowrap" }}>Host: {passengers[rides[rideID-1].HostID-1].PassName}</span></button>
      </div>
      <div className="OtherPeopleRide" style={{height:"39vh",maxHeight:"39vh"}}>
          <div style={{fontSize:"30px",fontWeight:"bold",height:"30vh",maxHeight:"30vh", marginBottom:"-22vh", paddingTop:"1vh"}}>Peers On this Ride:</div>
          {rides[rideID-1].PeersID.map((peerid) =>(
          <ul style={{listStyle:'disc'}}>
            <li style={{marginLeft:"1vw"}}>{passengers[peerid-1].PassName}</li>
          </ul>            
            ))}
      </div>
     

  </div>

  <div className="TrackCarpool">
      <div style={{fontSize:"30px",fontWeight:"bold",paddingLeft:"10px",paddingTop:"10px"}}>Track Your Carpool</div>
  </div>

  <div className="AbsoluteRight">
      <div className="RideUpdate" style={{overflowY:'scroll', overflowX:'hidden'}}>
          <h1 style={{color:"black", marginTop:"-2vh"}}>Ride Updates</h1>
          <div style={{paddingTop:"2px"}}>
            {rides[rideID-1].RideUpdates.map((update)=>(
              <ul style={{listStyle:'disc', marginLeft:"2vw", fontSize:'20px'}}>
                <li>{update}</li>
              </ul>


            ))}
          </div>
          
      </div>
      <div className="TravelTime">
          <div style={{fontSize:"30px",fontWeight:"bold"}}>
            <div style={{display:"flex", flexDirection:"row"}}>
            <h5 style={{fontWeight:"700", color:"black", fontSize:"x-large",textAlign:'left',width:"10vw", paddingLeft:'2vh'}}>Start Date: </h5><h6 style={{color:"black", textAlign:"left", paddingTop:"0.5vh", fontWeight:"400"}}>{rides[rideID-1].RideDateandTime[0]}</h6> 
            </div>
          
            <div style={{display:"flex", flexDirection:"row"}}>
            <h5 style={{fontWeight:"700", color:"black", fontSize:"x-large",textAlign:'left',width:"11vw", paddingLeft:'2vh', marginRight:"-1.5vh"}}>Start Time: </h5><h6 style={{color:"black", textAlign:"left", paddingTop:"0.5vh", fontWeight:"400"}}>{rides[rideID-1].RideDateandTime[1]}</h6> 
            </div>

          <h5 style={{fontWeight:"700", color:"black", fontSize:"x-large",textAlign:'left',width:"30vw", paddingLeft:'2vh'}}>Journey Time: </h5></div>
          
      </div>
      <div className="EstimatedArrival">
          <div style={{fontSize:"30px",fontWeight:"bold",paddingLeft:"2vh",textAlign:'left'}}>Stops</div>
          <div style={{fontSize:"20px",paddingLeft:"5vh",textAlign:'left'}}>
          {rides[rideID-1].Stops.map((stop) => (<ul>
            <li>{stop}</li>
          </ul>
            
            ))}
          
          </div>
      </div>
      <div className="MarkJoinDrop">
      
              <button className="Hostbtn" disabled={isMarkButtonDisabled} onClick={handleMarkMyJoiningandLeaving} style={{textAlign:"center", fontWeight:"700", cursor: isMarkButtonDisabled ? "not-allowed" : "pointer",
    color: isMarkButtonDisabled ? "black" : "white",
    pointerEvents: isMarkButtonDisabled ? "none" : "auto",}}>{(rides[rideID - 1].HostID === passengerID && rides[rideID - 1].isRideStarted === false) ? "Start Ride" : ((rides[rideID - 1].HostID === passengerID && rides[rideID - 1].isRideStarted === true) ? "End Ride" : "Mark my Joining/Leaving")}
    </button>

      </div>
  </div>
  </div> 
    
    </div>
      

  
 
  )}

{isLoading && (<div className="loading-spinner">
      <div className="spinner"></div>
    </div>)}
  
  
  </div>
    
   
  );
}

export default CurrentRide;
