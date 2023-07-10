import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../stylesheets/UserDashboard.css';
import Web3 from 'web3';
import CommuteIOABI from "../ABI/contracttestingABI.json";
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';
const contractAddress = '0x9D66687E6Da2BC0A5444125A8fA389C3e96F1921';

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
     // Added loading state

  useEffect(() => {
    const initialize = async () => {
      // Check if web3 is injected by the browser (Mist/MetaMask)
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Request account access
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

          setIsLoading(false);
          console.log(passengers);

          const requestDetails = await contract.methods.GetPassRequestDetails(parseInt(passengerID)).call();
          setUserDetails(requestDetails);

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
    
    <div className="outercover" style={{alignSelf:"center", width:"98vw"}}>
  <div className="PeersOnRide">
      <div className="MainRider" style={{height:"30vh",maxHeight:"30vh",width:"27vw", maxWidth:"27vw",overflowX:"scroll"}}>
          <div style={{fontSize:"30px",fontWeight:"bold",paddingBottom:"10px"}}>{passengers[passengerID-1].PassName.split(" ")[0]}'s Ride</div>
          <div><b>Ride ID: </b>{rideID}</div>
          <div><b>Source: </b>{rides[rideID-1].RideSourceLocation}</div>
          <div><b>Destination: </b>{rides[rideID-1].RideDestinationLocation}</div>
      </div>
      <div className="HOSTID" style={{marginTop:"2vh"}}>
          <button className="Hostbtn" style={{width:"27vw",height:"10vh",maxHeight:"10vh",overflowX:"scroll",overflowY:"hidden", marginLeft:"0vw", fontWeight:"700", marginBottom:"-1vh", textAlign:"left", paddingLeft:"1vh"}}><span style={{ whiteSpace: "nowrap" }}>Know Your Host: {passengers[rides[rideID-1].HostID-1].PassName}</span></button>
      </div>
      <div className="OtherPeopleRide" style={{height:"39vh",maxHeight:"39vh"}}>
          <div style={{fontSize:"30px",fontWeight:"bold",height:"30vh",maxHeight:"30vh", marginBottom:"-22vh", paddingTop:"1vh"}}>Peers On this Ride:</div>
          {rides[rideID-1].PeersID.map((peerid) =>(
          <ul style={{listStyle:'disc'}}>
            <li>{passengers[peerid-1].PassName}</li>
          </ul>            
            ))}
          
          
            

      </div>
     

  </div>

  <div className="TrackCarpool">
      <div style={{fontSize:"30px",fontWeight:"bold",paddingLeft:"10px",paddingTop:"10px"}}>Track Your Carpool</div>
  </div>

  <div className="AbsoluteRight">
      <div className="RideUpdate">
          <h1 style={{color:"black", marginTop:"-2vh"}}>Ride Updates</h1>
          <div style={{paddingTop:"2px"}}>
          </div>
          
      </div>
      <div className="TravelTime">
          <div style={{fontSize:"30px",fontWeight:"bold"}}>
            <div style={{display:"flex", flexDirection:"row"}}>
            <h5 style={{fontWeight:"700", color:"black", fontSize:"x-large",textAlign:'left',width:"10vw", paddingLeft:'2vh'}}>Start Date: </h5><h6 style={{color:"black", textAlign:"left", paddingTop:"0.5vh", fontWeight:"400"}}>{rides[rideID-1].RideDateandTime}</h6> 
            </div>
          
            <div style={{display:"flex", flexDirection:"row"}}>
            <h5 style={{fontWeight:"700", color:"black", fontSize:"x-large",textAlign:'left',width:"11vw", paddingLeft:'2vh', marginRight:"-1.5vh"}}>Start Time: </h5><h6 style={{color:"black", textAlign:"left", paddingTop:"0.5vh", fontWeight:"400"}}>{rides[rideID-1].RideDateandTime}</h6> 
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
      
              <button className="Hostbtn" style={{textAlign:"center", fontWeight:"700"}}>I have Joined</button>

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
