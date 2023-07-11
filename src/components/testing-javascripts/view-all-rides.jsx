import { useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../stylesheets/UserDashboard.css';
import Web3 from 'web3';
import Dropdown from 'react-bootstrap/Dropdown';
import CommuteIOABI from "../ABI/contracttestingABI.json";
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';
const contractAddress = '0x9D66687E6Da2BC0A5444125A8fA389C3e96F1921';





function ViewAllRides() {

  const history = useHistory();
  const allarray = useSelector((state) => state.allarray);
  
      const [web3, setWeb3] = useState(null);
      const [accounts, setAccounts] = useState([]);
      const [contract, setContract] = useState(null);
      const [passengerRequests, setPassengerRequests] = useState([]);
      const [passengers, setPassengers] = useState([]);
      const [rides, setRides] = useState([]);
      const [userDetails, setUserDetails] = useState([]);
      const [availableRides, setAvailableRides] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [isRideStopsLoading, setIsRideStopsLoading] = useState(true);
      const [sourceValue, setSourceValue] = useState('');
      const [destinationValue, setDestinationValue] = useState('');
      const [filteredSourceLocations, setFilteredSourceLocations] = useState([]);
      const [filteredDestinationLocations, setFilteredDestinationLocations] = useState([]);
      const [soucedropdownOpen, setSourceDropdownOpen] = useState(false);
      const [destinationdropdownOpen, setDestinationDropdownOpen] = useState(false);
      const [selectedRides, setSelectedRides] = useState([]);
      const [isSelectedRidesLoading, setIsSelectedRidesLoading] = useState(true);
      const [isSearchStarted, setisSearchStarted] =useState(false);
      const [allStopsAvailable, setAllStopsAvailable] = useState([]);
      const [showRideBookedModal, setShowRideBookedModal] = useState(false);
      const dropdownRef = useRef(null);

    const dropdownMenuStyle = {
      position: 'absolute',
      top: "6vh", // Adjust the distance from the input field
      left: '6.90vw',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      borderRadius: '0px 0px 10px 10px',
      padding: '8px',
      zIndex: 1,
      fontSize:'larger',
      width:"32.90vw",
      height:"19vh",
      overflowY:'scroll'
    };

    const DestinationdropdownMenuStyle = {
      position: 'absolute',
      top: "6vh", // Adjust the distance from the input field
      left: '43.80vw',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      borderRadius: '0px 0px 10px 10px',
      padding: '8px',
      zIndex: 1,
      fontSize:'larger',
      width:"32.90vw",
      height:"19vh",
      overflowY:'scroll'
    };
    
    const handleRideBookedModal = () => {
      setShowRideBookedModal(false);
    };
     

      const {passengerID} = useParams();
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
            // const numPassengers = await contract.methods.GetnumPassengers().call();
            // let passengersList = [];
        
            // for (let i = 0; i < numPassengers; i++) {
            //   const passengerDetails = await contract.methods.GetPassDetails((i+1)).call();
            //   passengersList.push({
            //     PassID: passengerDetails[0],
            //     PassName: passengerDetails[1],
            //     PassWalletAddress: passengerDetails[2],
            //     PassHomeAddress: passengerDetails[3],
            //     PassEMail: passengerDetails[9],
            //     PassVehicleName: passengerDetails[10],
            //     PassVehicleNumber: passengerDetails[11],
            //     PassVehicleDetailsHash: passengerDetails[4],
            //     PassGender: passengerDetails[5],
            //     PassReview: passengerDetails[6],
            //     PassRidesHosted: passengerDetails[7],
            //     PassRidesTaken: passengerDetails[8],
            //   });
            // }
        
            // setPassengers(passengersList);
  
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
            const obj = await contract.methods.getAllStopsAvailable().call();
            const allstopsList = Object.values(obj);
            console.log(allstopsList);
            setAllStopsAvailable(allstopsList);
            setIsRideStopsLoading(false);
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

    useEffect(() => {
      return () => {
        // Clean-up logic (if needed)
      };
    }, [selectedRides]);
    

   

    // Function to handle source input change
    const handleSourceInputChange = (event) => {
      const value = event.target.value;
      setSourceValue(value);
        
      // Filter source locations based on input value
      const filtered = allStopsAvailable.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSourceLocations(filtered);
      setSourceDropdownOpen(true);
    };
  
    // Function to handle destination input change
    const handleDestinationInputChange = (event) => {
      const value = event.target.value;
      setDestinationValue(value);
  
      // Filter destination locations based on input value
      const filtered = allStopsAvailable.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestinationLocations(filtered);
      setDestinationDropdownOpen(true);
    };
  
    // Function to handle location selection
     const handleSourceLocationSelect = (location) =>{
      setSourceValue(location);
      setSourceDropdownOpen(false);

    }

    const handleDestinationLocationSelect = (location) =>{
      setDestinationValue(location);
      setDestinationDropdownOpen(false);

    }

    const handleDisplay = (event) => {
      event.preventDefault();
      console.log(allarray);
    }

    const handleBookRide = async (id) => {
      const seats = 0;      
      const rideobj = await contract.methods.GetRideDetails(id).call();
      const ride = Object.values(rideobj);
      const HostID = ride[3];

      if (ride.length>0 && ride.HostID !=0) {
        const obj = await contract.methods.GetPassDetails((HostID)).call();
        const temp = Object.values(obj)
        const recipientAddress = temp[2];
          try {
            const gasAmount = await contract.methods.BookARide(passengerID, id, seats, sourceValue, destinationValue).estimateGas({ from: accounts[0] });
            await contract.methods
              .BookARide(passengerID, id, seats, sourceValue, destinationValue)
              .send({ from: accounts[0], to: recipientAddress, gas: gasAmount });
          
            console.log("Ride Booked Successfully!");
            setShowRideBookedModal(true);
          } catch (error) {
            console.error("Error booking ride:", error);
            // Handle the error appropriately (e.g., show an error message to the user)
          }
      } else {
  console.error("Invalid rideid or HostID not found");
  // Handle the error appropriately (e.g., show an error message to the user)
}
                
    };
    

    


    const handleSearchRides = (event) => {
      event.preventDefault();
      setisSearchStarted(true);
      console.log("Hi");
      console.log(allStopsAvailable);
      const filteredRides = rides.filter((ride) => {

        let flag = false;

        if(sourceValue==ride.RideSourceLocation){
          if(destinationValue == ride.RideDestinationLocation){flag = true;}

          else if(ride.Stops.includes(destinationValue)){flag = true;}

          else{flag = false;}
        }

        else if(ride.Stops.includes(sourceValue)){

          if(destinationValue == ride.RideDestinationLocation){flag = true;}

          else if(ride.Stops.includes(destinationValue) && (ride.Stops.indexOf(sourceValue) < ride.Stops.indexOf(destinationValue))){flag = true;}

          else{flag = false;}          
        }
        
        return flag;
      })
      // console.log(filteredRides);
      setSelectedRides(filteredRides);
      setIsSelectedRidesLoading(false);
      // console.log(selectedRides);

    };
  
  
  
  
    return (
      <div>
      {!isLoading && (
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

    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '13vh' }}>
      <label>
        <h5 style={{ fontWeight: '700', fontSize: 'x-large', color: 'black', marginLeft: '1vw' }}>From: </h5>
      </label>
      <input
        value={sourceValue}
        onChange={handleSourceInputChange}
        placeholder='Enter Source'
        type='text'
        name='sourceLocation'
        style={{ width: '33vw', marginRight: '1vw', marginLeft: '1vw', paddingTop: '0vh', fontSize:"large",paddingLeft:"0.5vw" }}
      />
      <label>
        <h5 style={{ fontWeight: '700', fontSize: 'x-large', color: 'black' }}>To:</h5>
      </label>
      <input
        value={destinationValue}
        onChange={handleDestinationInputChange}
        placeholder='Enter Destination'
        type='text'
        name='destinationLocation'
        style={{ width: '33vw', marginLeft: '0.5vw', paddingTop: '0vh', fontSize:"large",paddingLeft:"0.5vw"}}
      />
      <button
        style={{
          backgroundColor: '#116D6E',
          fontWeight: '700',
          fontSize: 'large',
          color: 'white',
          marginLeft: '1vw',
          marginRight: '-6vw',
          marginTop: '0vh',
          height: '6vh',
          width: '20vw'
        }}

        onClick={handleSearchRides}
      >
        Search Rides
      </button>
      {(filteredSourceLocations.length > 0) && sourceValue.length >0 && soucedropdownOpen && (
        <div style={dropdownMenuStyle}>
          {filteredSourceLocations.map((location, index) => (
            <div key={index} style={{borderBottom:"solid 1px black"}}><button style={{textAlign:"left", marginBottom:"1vh"}} onClick={() => handleSourceLocationSelect(location)}>
              {location}</button>
            </div>
          ))}
        </div>
      )}
      {filteredDestinationLocations.length > 0 && destinationValue.length>0 &&destinationdropdownOpen && (
        <div style={DestinationdropdownMenuStyle}>
          {filteredDestinationLocations.map((location, index) => (
            <div key={index}><button style={{textAlign:"left", marginBottom:"1vh"}}  onClick={() => handleDestinationLocationSelect(location)}>
              {location}</button>
            </div>
          ))}
        </div>
      )}
    </div>

    {!(isSelectedRidesLoading) && (<div style={{display:"flex",flexDirection:"column",marginLeft:"2vh",marginTop:"5vh", alignSelf:"center", border:"1px solid black", width:"98vw", height:"74vh"}}>
   
   <div style={{display:"fex",flexDirection:"column",alignSelf:"center", border:'solid 1px black',width:"30vw",backgroundColor:"#FEFEFA",marginTop:"-2vh"}}>
     <h5 style={{fontWeight:"700", color:"black", fontSize:"x-large",textAlign:'center',width:"30vw"}}>Rides Available For Me</h5>
     </div>
     <div>
     <table style={{marginTop:"1vh"}}>
       <tbody>
       {selectedRides.map((ride) => (<tr>
         <td>
           <div style={{backgroundColor:"#FEFEFA", width:"96vw",marginLeft:"1vw", height:"8vh", marginBottom:"2vh",display:"flex",flexDirection:"row"}}>
             <div style={{display:"flex", flexDirection:"row", marginTop:"2vh", paddingLeft:"2vh"}}><h5 style={{fontWeight:"700",fontSize:"large", color:"black"}}>Ride ID: </h5><p style={{fontSize:"large", color:"black", paddingLeft:"0.5vh"}}>{ride.RideID}</p></div>
             <div style={{width:"8vw", display:"flex", flexDirection:"row",marginTop:"2vh", paddingLeft:"10vw"}}>
               <h5 style={{fontWeight:"700",fontSize:"large", color:"black"}}>Role: </h5>
               <p style={{fontSize:"large", color:"black", paddingLeft:"0.5vh"}}>{ride.HostID==passengerID?"Host":"Passenger"}
               </p></div>
             <div style={{width:"40vw", display:"flex", flexDirection:"row",marginTop:"2vh", marginLeft:"10vw"}}>
               <h5 style={{fontWeight:"700",fontSize:"large", color:"black", marginLeft:"10vw"}}>Ride Status: </h5>
               <p style={{fontSize:"large", color:"black", paddingLeft:"0.5vh"}}>{(ride.isRideStarted && !ride.isRideEnded)?"Started":!(ride.isRideStarted)?"Not started":"Ended"}</p></div>
             <div style={{width:"30vw", display:"flex", flexDirection:"row",marginTop:"2vh", marginLeft:"-10vw"}}>
              {!(ride.HostID==passengerID) && (
                <button style={{backgroundColor:"#116D6E",fontWeight:"700",fontSize:"large", color:"white", marginLeft:"8vw", marginRight:"-6vw", marginTop:"-1vh", height:"6vh", width:"20vw"}} onClick={() => handleBookRide(ride.RideID)}>{(ride.PeersID.includes(passengerID))?"Booked":"Book Ride"}</button>
              )}
               <button style={{backgroundColor:"#116D6E",fontWeight:"700",fontSize:"large", color:"white", marginLeft:"8vw", marginRight:"-6vw", marginTop:"-1vh", height:"6vh", width:"20vw", marginRight:"-9vw"}}>View Ride Details</button>
              </div>
            
             </div>
             
   
 </td>
       </tr>))}
       </tbody>
     </table>
   </div>
     </div>)}    
    
    
         
        </div>
      )}

{(isLoading || isRideStopsLoading) && (<div className="loading-spinner">
      <div className="spinner"></div>
    </div>)}

    {(isSelectedRidesLoading)&& (isSearchStarted) && (<div className="loading-spinner">
      <div className="spinner"></div>
    </div>)}

    {(isRideStopsLoading) &&(<div className="loading-spinner">
      <div className="spinner"></div>
    </div>) }

{!isSearchStarted &&  (<div style={{display:"flex",flexDirection:"column",marginLeft:"2vh",marginTop:"5vh", alignSelf:"center", border:"1px solid black", width:"98vw", height:"74vh"}}><h5 style={{fontSize:"x-large", textAlign:"center", color:"black", marginTop:"30vh"}}>Select your source and destination.</h5></div>)

}

<Modal show={showRideBookedModal} onHide={handleRideBookedModal} size="lg" centered>
  <Modal.Header>
  <h4 style={{fontWeight:"700",color:'black'}}>Alert</h4>
  </Modal.Header>

        <Modal.Body style={{textAlign:"center"}}>
          <div style={{alignSelf:"center", textAlign:"center"}}>
          <h4 style={{alignSelf:"center",color:'black',fontWeight:"700",fontSize:"x-large"}}>This Ride has been booked for you!</h4>
          <h4 style={{alignSelf:"center",color:'black',fontSize:"x-large"}}>Check the status of this ride in the <b>Check Rides</b> section</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleRideBookedModal} style={{backgroundColor:"transparent",border:'solid 1px black',paddingLeft:'1vh',paddingRight:'1vh',textAlign:'center'}}>
            Close
          </button>
        </Modal.Footer>
      </Modal>



    </div>
    
      );
  }
  
  export default ViewAllRides;