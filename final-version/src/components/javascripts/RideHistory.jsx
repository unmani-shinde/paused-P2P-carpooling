import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';
import CommuteIOABI from '../ABI/contracttestingABI.json';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { style } from '@mui/system';

const contractAddress = '0x9D66687E6Da2BC0A5444125A8fA389C3e96F1921';

function RideHistory() {
  const { passengerID } = useParams();

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null); 
  const [rides, setRides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ridesHosted, setRidesHosted] = useState([]);
  const [ridesTaken, setRidesTaken] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [showRideDetais, setShowRideDetails] = useState(false);
  const [selectedRideID, setSelectedRideID] = useState('');


  
  const handleShowRideDetails = () =>{
    setShowRideDetails(true);
  }

  const handleHideRideDetails = () =>{
    setShowRideDetails(false);
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
            
            const numRides = await contract.methods. GetnumRides().call();
            let hosted = [];
            let taken = [];   
            let ridesList = [];        
  
            for (let i = 1; i <= numRides; i++) {
              const rideDetails = await contract.methods.GetRideDetails(i).call();
              if(rideDetails[3]==passengerID && rideDetails[11]){hosted.push(rideDetails);}
              else if(rideDetails[4].includes(passengerID) && rideDetails[11]){taken.push(rideDetails);}
              ridesList.push(rideDetails);

              
               
            }
            setRidesHosted(hosted);
            setRidesTaken(taken);
            setRides(ridesList);

            const numPassengers = await contract.methods.GetnumPassengers().call();
            let passengersList = [];
        
            for (let i = 0; i < numPassengers; i++) {
              const passengerDetails = await contract.methods.GetPassDetails((i+1)).call();
              passengersList.push(passengerDetails);
            }
        
            setPassengers(passengersList);        
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

  return (
    <div>
      {!isLoading && (  <div>
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
    <div className="RideHistory" style={{display:'flex',flexDirection:'row',border:'solid 1px black',width:"98vw",marginTop:"15vh",alignSelf:'center'}}>
    <div className="Rideshosted" style={{ display: 'flex', flexDirection: 'column', border: 'solid 1px black', width: '45vw', height: '75vh', margin: '2vw', alignSelf: 'center'}}>
    <div style={{backgroundColor:"#FEFEFA",border:'solid 1px black',width:'10vw',alignSelf:'center',zIndex:'100',marginTop:"-2vh"}}>
                <h5 style={{color:"black",textAlign:'center',fontWeight:"700",zIndex:"100"}}>Rides Hosted</h5>
                </div>
    <div style={{overflow:'auto'}}>

    <table style={{ border: 'solid 1px black', marginTop: '1vh' }}>
    <tbody>
      {ridesHosted.map((ride) => (
        <tr>
          <td style={{ backgroundColor: "#FEFEFA", paddingLeft: "2vh", borderBottom: 'solid 1px black' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flexDirection: 'column', maxWidth: "34vw", height: '18vh', overflowY: "scroll", overflowX: 'hidden', flex: 1 }}>
                
                
                <h5 style={{ color: 'black', textAlign: 'left', marginTop: "1vh" }}><b>Ride ID: </b>{ride[0]}</h5>
                <h5 style={{ color: 'black', textAlign: 'left', marginTop: "1vh", lineHeight: "3vh" }}><b>From:</b> {ride[1]}</h5>
                <h5 style={{ color: 'black', textAlign: 'left', marginTop: "2vh", lineHeight: "3vh" }}><b>To:</b> {ride[2]}</h5>
              </div>

              <div style={{ paddingTop: "7vh", paddingLeft: "1vw" }}>
                <button className="ridebutton" style={{ width: '10vw', height: "5vh", alignSelf: "center", padding: "1vh", backgroundColor: "#116D6E", color: "white", fontWeight: "700", marginRight: "1vw" }} onClick={() => {
                  handleShowRideDetails();
                  setSelectedRideID(ride[0]);
                }}>
                  View Details
                </button>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>



    </div>

  

  {ridesHosted.length === 0 && (
    <div style={{ textAlign: 'center', marginTop: "30vh" }}>
      <h4 style={{ color: 'black', fontWeight: "700", fontSize: 'large' }}>All the rides you have hosted and completed will appear here.</h4>
    </div>
  )}
</div>


            <div className="Ridestaken" style={{display:'flex',flexDirection:'column',border:'solid 1px black',width:'45vw',height:'75vh',marginTop:"2vw",marginLeft:'2vw'}}>
            <div style={{backgroundColor:"#FEFEFA",border:'solid 1px black',width:'10vw',alignSelf:'center',zIndex:'100',marginTop:"-2vh"}}>
                <h5 style={{color:"black",textAlign:'center',fontWeight:"700"}}>Rides Taken</h5>
                </div>

                <div style={{overflow:'auto'}}>

    <table style={{ border: 'solid 1px black', marginTop: '1vh' }}>
    <tbody>
      {ridesTaken.map((ride) => (
        <tr>
          <td style={{ backgroundColor: "#FEFEFA", paddingLeft: "2vh", borderBottom: 'solid 1px black' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flexDirection: 'column', maxWidth: "34vw", height: '18vh', overflowY: "scroll", overflowX: 'hidden', flex: 1 }}>
                
                
                <h5 style={{ color: 'black', textAlign: 'left', marginTop: "1vh" }}><b>Ride ID: </b>{ride[0]}</h5>
                <h5 style={{ color: 'black', textAlign: 'left', marginTop: "1vh", lineHeight: "3vh" }}><b>From:</b> {ride[1]}</h5>
                <h5 style={{ color: 'black', textAlign: 'left', marginTop: "2vh", lineHeight: "3vh" }}><b>To:</b> {ride[2]}</h5>
              </div>

              <div style={{ paddingTop: "7vh", paddingLeft: "1vw" }}>
                <button className="ridebutton" style={{ width: '10vw', height: "5vh", alignSelf: "center", padding: "1vh", backgroundColor: "#116D6E", color: "white", fontWeight: "700", marginRight: "1vw" }} onClick={() => {
                  handleShowRideDetails();
                  setSelectedRideID(ride[0]);
                }}>
                  View Details
                </button>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>



    </div>






             
{ridesTaken.length ==0 && (
  <div style={{textAlign:'center',marginTop:"30vh"}}><h4 style={{color:'black',fontWeight:"700",fontSize:'large'}}>All the rides you have taken and completed will appear here.</h4></div>
)}
            
                
            </div>
        </div>
    </div>

    <Modal show={showRideDetais} onHide={handleHideRideDetails} size="lg" centered style={{marginTop:"4vh"}}>
  <Modal.Header>
    <h4 style={{ fontWeight: "700", color: 'black' }}>Ride Details:</h4>
  </Modal.Header>
  <Modal.Body style={{ textAlign: "center" }}>
    <div style={{ height: "60vh", maxHeight: '60vh', overflow: 'auto'}}>
      <div style={{ alignSelf: "center", textAlign: "center" }}>
        <h3 style={{ alignSelf: "center", fontWeight: "700", color: "black" }}><u>RIDE ID: {selectedRideID}</u></h3>
      </div>
    
          {ridesHosted.length > 0 && rides.length >0 && selectedRideID > 0 && selectedRideID<=rides.length &&  (
           
  <div style={{ textAlign: "left", display: 'flex', flexDirection: 'column' }}>
    <h4 style={{ fontWeight: "700", color: "black", fontSize: "x-large", textAlign: 'left',marginBottom:"2vh" }}>Source, Destination and Stops:</h4>
    <h4 style={{ fontWeight: "400", color: "black", fontSize: "20px", textAlign: 'left', }}><b><u>Source:</u> </b>{rides[selectedRideID - 1][1]}</h4>
    <h4 style={{ fontWeight: "400", color: "black", fontSize: "20px", textAlign: 'left' }}><b><u>Destination:</u> </b>{rides[selectedRideID - 1][2]}</h4>
    <h4 style={{ fontWeight: "400", color: "black", fontSize: "20px", textAlign: 'left' }}>
  <b><u>Stops:</u> </b>
  <br></br>
  <ol>
    {rides[selectedRideID-1][5].map((stop, index) => (
      <li key={index+1}>{stop}</li>
    ))}
  </ol>
</h4>
<hr></hr>
<h4 style={{ fontWeight: "700", color: "black", fontSize: "x-large", textAlign: 'left',marginBottom:"2vh" }}>Ride Schedule:</h4>
<h4 style={{ fontWeight: "400", color: "black", fontSize: "20px", textAlign: 'left',marginBottom:'1vh' }}><b><u>Start Date:</u> </b>{rides[selectedRideID - 1][9][0]}</h4>
<h4 style={{ fontWeight: "400", color: "black", fontSize: "20px", textAlign: 'left',marginBottom:'1vh' }}><b><u>Start Time:</u> </b>{rides[selectedRideID - 1][9][1]}</h4>
<h4 style={{ fontWeight: "400", color: "black", fontSize: "20px", textAlign: 'left', marginBottom: '1vh' }}>
  <b><u>Status:</u> </b>
  This ride has {rides[selectedRideID - 1][10] && rides[selectedRideID - 1][11] ? "ended." :
    (rides[selectedRideID - 1][10] && !rides[selectedRideID - 1][11]) ? "has started." :
      (!rides[selectedRideID - 1][10]) ? "not started." : ""}
</h4>
<hr></hr>
<h4 style={{ fontWeight: "700", color: "black", fontSize: "x-large", textAlign: 'left',marginBottom:"2vh" }}>Know Your Peers:</h4>
<h4 style={{ fontWeight: "400", color: "black", fontSize: "20px", textAlign: 'left', marginBottom: '1vh' }}>
  <b><u>Host:</u> </b>
  {(rides[selectedRideID - 1][3] === passengerID) ? "You" :
    (passengers.length > 0 &&
      passengers.map((passenger) =>
        passenger[0] === rides[selectedRideID - 1][3] ? passenger[1] : ""
      ))}
</h4>

<h4 style={{ fontWeight: "400", color: "black", fontSize: "20px", textAlign: 'left',marginBottom:'1vh' }}><b><u>Peers:</u></b><br></br>
<ol>
  {rides[selectedRideID - 1][4].map((peer, index) => (
    <li key={index + 1}>
      {passengers.length > 0 &&
        passengers.map((passenger, passengerIndex) =>
          passenger[0] === peer ? passenger[1] : ""
        )}
    </li>
  ))}
</ol>

</h4>
  </div>
)}

         
          <table>
            <tbody></tbody>
          </table>       
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleHideRideDetails} style={{backgroundColor:"#14C38E",padding:'1vh',color:'#FEFEFA',fontWeight:'700',borderRadius:"10px"}}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {/* RideID:rideDetails[0],
          //        RideSourceLocation:rideDetails[1],
          //        RideDestinationLocation:rideDetails[2],
          //        HostID:rideDetails[3],
          //        PeersID:rideDetails[4],
          //        Stops:rideDetails[5],
          //        RideFare:rideDetails[6],
          //        RideSeatsAvailable:rideDetails[7],
          //  RideUpdates:rideDetails[8],
          // RideDateandTime:rideDetails[9],
          //  isRideStarted:rideDetails[10],
          //  isRideEnded:rideDetails[11] */}


    </div>)}

    {isLoading && (<div className="loading-spinner">
      <div className="spinner"></div>
    </div>)}
    



    </div>
    
    
  );
}

export default RideHistory;
