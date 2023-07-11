import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Modal } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactStars from "react-rating-stars-component";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import LeafletGeocoder from "../testing-javascripts/LeafletGeocoder.jsx";
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
    const [isMarkButtonDisabled, setIsMarkButtonDisabled] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [showRideEndModal, setShowRideEndModal] = useState(false);
    const [feedback, setFeedback] = useState({});
    const [rating, setRating] = useState(0);
    const [showRideStartedModal, setShowRideStartedModal] = useState(false);
    const [showRideJoinedModal, setShowRideJoinedModal] = useState(false);
    const [showRideEndedModal, setShowRideEndedModal] = useState(false);
    const [showRideLeftModal, setShowRideLeftModal] = useState(false);
  
    const position = [20.5, 78.9];
     // Added loading state

  
  const handleRideStartedModal = () => {
    setShowRideStartedModal(false);
  };

  const handleRideJoinedModal = () =>{
    setShowRideJoinedModal(false);
  }

  const handleRideEndedModal = () =>{
    setShowRideEndedModal(false);
  }

  const handleRideLeftModal = () =>{
    setShowRideLeftModal(false);
  }


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

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  
  const handleLeaving = async () =>{
    const ridePassengers = await contract.methods.GetRidePassengersDetails(rideID, passengerID).call();
    if (passengerID==rides[rideID-1].HostID && rides[rideID-1].isRideEnded==false && rides[rideID-1].isRideStarted==true){
      await contract.methods.MarkPassengerLeaving(passengerID, rideID, rides[rideID-1].RideDestinationLocation).send({ from: accounts[0] });
      setIsMarkButtonDisabled(true);
      setShowRideEndModal(false);
      setShowRideEndedModal(true);
    }

    else if (ridePassengers[0] != "" && ridePassengers[1] != "" && ridePassengers[2] === true) {
      //PassID matches and is already on the ride, call MarkPassengerLeaving
      await contract.methods.MarkPassengerLeaving(passengerID, rideID, ridePassengers[1]).send({ from: accounts[0] });
      console.log("MarkPassengerLeaving called");
      setShowRideEndModal(false);
      setShowRideLeftModal(true);
    }

    

  }

  
  const handleCloseRideEndModal = () => {
    setShowRideEndModal(false);
  };


  const handleMarkMyJoiningandLeaving = async (event) => {
    event.preventDefault();
  
    if (!(rides[rideID - 1].isRideStarted) && !(rides[rideID - 1].HostID === passengerID)) {
      alert("Please wait for the host to start this ride.");
    } else if (rides[rideID - 1].isRideEnded) {
      alert("The Host has ended this ride for everyone.");
    } else {
      try {
        const ridePassengers = await contract.methods.GetRidePassengersDetails(rideID, passengerID).call();
        console.log(ridePassengers[0],ridePassengers[1],ridePassengers[2]);
        console.log(rides[rideID-1].PeersID.includes(passengerID));
        if(passengerID==rides[rideID-1].HostID && rides[rideID-1].isRideStarted==false){
          await contract.methods.MarkPassengeerJoining(passengerID, rideID, rides[rideID-1].RideSourceLocation).send({ from: accounts[0] });
          setShowRideStartedModal(true);
        }

        else if (passengerID==rides[rideID-1].HostID && rides[rideID-1].isRideEnded==false && rides[rideID-1].isRideStarted==true){
          setShowRideEndModal(true);
          // await contract.methods.MarkPassengerLeaving(passengerID, rideID, rides[rideID-1].RideDestinationLocation).send({ from: accounts[0] });
          // setIsMarkButtonDisabled(true);
        }
  
        else if (rides[rideID-1].PeersID.includes(passengerID) &&ridePassengers[0] != "" && ridePassengers[1] != "" && ridePassengers[2] === false) {
          // PassID matches and is not on the ride, call MarkPassengeerJoining
          const sourceLoc = ridePassengers[0];
          const destLoc = ridePassengers[1];
          const gasAmount = await contract.methods.MarkPassengeerJoining(passengerID, rideID, sourceLoc).estimateGas({from:accounts[0]});
          await contract.methods.MarkPassengeerJoining(passengerID, rideID, sourceLoc).send({ from: accounts[0],gas:(gasAmount+10000) });
          console.log("MarkPassengeerJoining called");
          setShowRideJoinedModal(true);


        } else if (rides[rideID-1].PeersID.includes(passengerID) && ridePassengers[0] != "" && ridePassengers[1] != "" && ridePassengers[2] === true) {
          //PassID matches and is already on the ride, call MarkPassengerLeaving
          setShowRideEndModal(true);
          // await contract.methods.MarkPassengerLeaving(passengerID, rideID, ridePassengers[1]).send({ from: accounts[0] });
          // console.log("MarkPassengerLeaving called");
        } 
        else {
          console.log("Passenger not found in ride passengers list");
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error
      }
    }
  };

  // Function to handle button click
  const handleButtonClick = async (peerid) => {
    // Check if the feedback for the peer has already been recorded
    if (feedback.hasOwnProperty(peerid)) {
      console.log("Feedback already recorded for peer ID:", peerid);
      // You can add your own logic here
    } else {
      console.log("Button clicked for peer ID:", peerid);
      console.log("Rating given for this peer: ", rating);
  
      // Update the feedback state with the rating for the peer
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        [peerid]: rating,
      }));
      try {
        await contract.methods.updatePassengerReview(peerid, rating).send({ from: accounts[0] });
      } catch (error) {
        console.error(error);
      }
      
  
      // You can add your own logic here to perform further actions, such as storing the feedback in a database or displaying a confirmation message.
    }
  };
  

// Render the list with buttons
  
  
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

  <div className="TrackCarpool" style={{display:'flex',flexDirection:'column'}}>
      <div style={{fontSize:"30px",fontWeight:"bold",paddingLeft:"10px",paddingTop:"10px"}}>Track Your Carpool</div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ width: "38vw", height: "72vh", alignSelf: 'center' }}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}@2x.jpg?key=OnXJPBh7IkMHefqgKgQS"
  />
  {markers.length > 0 && markers.map((marker, index) => (
    <Marker position={marker.position} key={index}>
      <Popup>{marker.label}</Popup>
    </Marker>
  ))}
  <LeafletGeocoder />
</MapContainer>

  </div>

  <div className="AbsoluteRight">
      <div className="RideUpdate" style={{overflowY:'scroll', overflowX:'hidden'}}>
          <h3 style={{color:"black", marginTop:"-1vh",fontWeight:'700'}}>Ride Updates</h3>
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
            <h5 style={{fontWeight:"700", color:"black", fontSize:"x-large",textAlign:'left',width:"10vw", paddingLeft:'2vh'}}>Start Date: </h5><h5 style={{color:"black", textAlign:"left", paddingTop:"0.5vh", fontWeight:"400"}}>{rides[rideID-1].RideDateandTime[0]}</h5> 
            </div>
          
            <div style={{display:"flex", flexDirection:"row"}}>
            <h5 style={{fontWeight:"700", color:"black", fontSize:"x-large",textAlign:'left',width:"11vw", paddingLeft:'2vh', marginRight:"-1.5vh"}}>Start Time: </h5><h5 style={{color:"black", textAlign:"left", paddingTop:"0.5vh", fontWeight:"400"}}>{rides[rideID-1].RideDateandTime[1]}</h5> 
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

  <Modal show={showRideEndModal} onHide={handleCloseRideEndModal} size="lg" centered>
  <Modal.Header>
  <h4 style={{fontWeight:"700",color:"black"}}>Alert! This ride will be marked as ended.</h4>
  </Modal.Header>

        <Modal.Body style={{textAlign:"center"}}>
          <div style={{alignSelf:"center", textAlign:"center",display:'flex',flexDirection:'column',height:"50vh",overflow:'auto'}}>
          <h4 style={{alignSelf:"center",color:'black',fontWeight:"700"}}>Please spare a minute to rate your Peers.</h4>
          <h5 style={{alignSelf:"center",color:'black'}}>For each peer individually, please select the number of stars you wish to offer and then click on "<b>Provide Feedback</b>".</h5>
          <table style={{alignSelf:'center',border:'solid 1px black',width:"50vw"}}>
  <thead>
    <tr>
      <th style={{width:"5vw",border:'solid 1px black'}}><h5 style={{color:"black",fontWeight:"700"}}>Sr.No:</h5></th>
      <th style={{width:"14vw",border:'solid 1px black'}}><h5 style={{color:"black",fontWeight:"700"}}>Peer Name</h5></th>
      <th style={{width:"14vw",border:'solid 1px black'}}><h5 style={{color:"black",fontWeight:"700"}}>Feedback</h5></th>
      <th><h5 style={{color:"black",fontWeight:"700"}}>Actions</h5></th>
    </tr>
  </thead>
  <tbody style={{alignSelf:'center'}}>
    <tr style={{height:'10vh',border:'solid 1px black'}}>
      <td>{1}</td>
      <td>{passengers[((rides[rideID-1].HostID)-1)].PassName}</td>
      <td style={{paddingLeft:(rides[rideID-1].HostID==passengerID)?"0w":"2.5vw",textAlign:'center'}}>{rides[rideID-1].HostID==passengerID &&(<h6 style={{color:"black",textAlign:'center',fontWeight:'700'}}>Not Applicable</h6>)}
          {!(rides[rideID-1].HostID==passengerID) &&(<ReactStars
        count={5}
        onChange={handleRatingChange}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        filledIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"></ReactStars>)}</td>
      <td>
      {rides[rideID-1].HostID==passengerID &&(<h6 style={{color:"black",textAlign:'center',fontWeight:'700'}}>Not Applicable</h6>)}
      {!(rides[rideID-1].HostID==passengerID) &&(<button
      onClick={() => handleButtonClick(rides[rideID-1].HostID)}
      disabled={feedback.hasOwnProperty(rides[rideID-1].HostID)}
      style={{border:'solid 1px black',padding:"1vh"}}
    >
      {feedback.hasOwnProperty(rides[rideID-1].HostID) ? "Feedback Recorded" : "Record Feedback"}
    </button>)}

      </td>
    </tr>
    {rides[rideID - 1].PeersID.map((peerid, index) => (
      <tr key={peerid} style={{height:'10vh',border:'solid 1px black'}}>
        <td>{index + 2}</td>
        <td>{passengers[peerid-1].PassName}</td>
        <td style={{paddingLeft:(rides[rideID-1].HostID==passengerID)?"0w":"2.5vw"}}> 
        {passengerID==peerid &&(<h6 style={{color:"black",textAlign:'center',fontWeight:'700'}}>Not Applicable</h6>)}
        {!(passengerID==peerid) && (
        <ReactStars
        count={5}
        onChange={handleRatingChange}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        filledIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"></ReactStars>)}        
        </td>
        <td>
        {passengerID==peerid &&(<h6 style={{color:"black",textAlign:'center',fontWeight:'700'}}>Not Applicable</h6>)}
        {!(passengerID==peerid) && (<button
      onClick={() => handleButtonClick(peerid)}
      disabled={feedback.hasOwnProperty(peerid)}
      style={{border:'solid 1px black',padding:"1vh"}}
    >
      {feedback.hasOwnProperty(peerid) ? "Feedback Recorded" : "Record Feedback"}
    </button>)}
        
        </td>
      </tr>
    ))}
  </tbody>
</table>
          
          </div>
         
          


     
        </Modal.Body>
        <Modal.Footer style={{alignSelf:'center'}}>
        <button
  onClick={() => {
    setShowRideEndModal(false);
    handleLeaving();
  }}
  style={{
    backgroundColor: "#116D6E",
    padding:'1vh',
    textAlign: "center",
    color:'white',
    alignSelf:'center',
    borderRadius:'5px',
    fontWeight:'700'
  }}
>
  Proceed to End Ride
</button>

        </Modal.Footer>
      </Modal>


      <Modal show={showRideStartedModal} onHide={handleRideStartedModal} size="lg" centered>
  <Modal.Header>
  <h4 style={{fontWeight:"700",color:'black'}}>Alert</h4>
  </Modal.Header>

        <Modal.Body style={{textAlign:"center"}}>
          <div style={{alignSelf:"center", textAlign:"center"}}>
          <h4 style={{alignSelf:"center",color:'black',fontWeight:"700",fontSize:"x-large"}}>You have started this ride!</h4>
          <h4 style={{alignSelf:"center",color:'black',fontSize:"x-large"}}>All the updates regarding this ride will be made available in this section.</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleRideStartedModal} style={{backgroundColor:"transparent",border:'solid 1px black',paddingLeft:'1vh',paddingRight:'1vh',textAlign:'center'}}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRideJoinedModal} onHide={handleRideJoinedModal} size="lg" centered>
  <Modal.Header>
  <h4 style={{fontWeight:"700",color:'black'}}>Alert</h4>
  </Modal.Header>

        <Modal.Body style={{textAlign:"center"}}>
          <div style={{alignSelf:"center", textAlign:"center"}}>
          <h4 style={{alignSelf:"center",color:'black',fontWeight:"700",fontSize:"x-large"}}>You have joined this ride!</h4>
          <h4 style={{alignSelf:"center",color:'black',fontSize:"x-large"}}>All the updates regarding this ride will be made available in this section.</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleRideJoinedModal} style={{backgroundColor:"transparent",border:'solid 1px black',paddingLeft:'1vh',paddingRight:'1vh',textAlign:'center'}}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      
      <Modal show={showRideEndedModal} onHide={handleRideEndedModal} size="lg" centered>
  <Modal.Header>
  <h4 style={{fontWeight:"700",color:'black'}}>Alert</h4>
  </Modal.Header>

        <Modal.Body style={{textAlign:"center"}}>
          <div style={{alignSelf:"center", textAlign:"center"}}>
          <h4 style={{alignSelf:"center",color:'black',fontWeight:"700",fontSize:"x-large"}}>You have ended this ride!</h4>
          <h4 style={{alignSelf:"center",color:'black',fontSize:"x-large"}}>Any further updates regarding this ride will be discontinued.</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleRideEndedModal} style={{backgroundColor:"transparent",border:'solid 1px black',paddingLeft:'1vh',paddingRight:'1vh',textAlign:'center'}}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRideLeftModal} onHide={handleRideLeftModal} size="lg" centered>
  <Modal.Header>
  <h4 style={{fontWeight:"700",color:'black'}}>Alert</h4>
  </Modal.Header>

        <Modal.Body style={{textAlign:"center"}}>
          <div style={{alignSelf:"center", textAlign:"center"}}>
          <h4 style={{alignSelf:"center",color:'black',fontWeight:"700",fontSize:"x-large"}}>You have left this ride!</h4>
          <h4 style={{alignSelf:"center",color:'black',fontSize:"x-large"}}>Hope you had a good journey.</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleRideLeftModal} style={{backgroundColor:"transparent",border:'solid 1px black',paddingLeft:'1vh',paddingRight:'1vh',textAlign:'center'}}>
            Close
          </button>
        </Modal.Footer>
      </Modal>



    
    </div>
      

  
 
  )}

{isLoading && (<div className="loading-spinner">
      <div className="spinner"></div>
    </div>)}
  
  
  </div>
    
   
  );
}

export default CurrentRide;
