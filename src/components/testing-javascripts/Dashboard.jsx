import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../stylesheets/UserDashboard.css';
import Web3 from 'web3';
import CommuteIOABI from "../ABI/contracttestingABI.json";
import Modal from 'react-bootstrap/Modal';
import Navbar from '../javascripts/Navbar';
import TopSection from '../javascripts/TopSection';
import { FaStar } from 'react-icons/fa';
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';



const contractAddress = '0x303b3f8D8b2832A2044cb404Efe326d300BF590C';

function DashboardPage() {
  const  {passengerID}  = useParams();

  const [web3, setWeb3] = useState(null);
const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [passengerRequests, setPassengerRequests] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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



  // const loadPassengers = async (contract) => {
  //   const numPassengers = await contract.methods.GetnumPassengers().call();
  //   const passengersList = [];

  //   for (let i = 0; i < numPassengers; i++) {
  //     const passengerDetails = await contract.methods.GetPassDetails((i+1)).call();
  //     passengersList.push({
  //       PassID: passengerDetails[0],
  //       PassName: passengerDetails[1],
  //       PassWalletAddress: passengerDetails[2],
  //       PassHomeAddress: passengerDetails[3],
  //       PassEMail: passengerDetails[9],
  //       PassVehicleName: passengerDetails[10],
  //       PassVehicleNumber: passengerDetails[11],
  //       PassVehicleDetailsHash: passengerDetails[4],
  //       PassGender: passengerDetails[5],
  //       PassReview: passengerDetails[6],
  //       PassRidesHosted: passengerDetails[7],
  //       PassRidesTaken: passengerDetails[8],
  //     });
  //   }

  //   setPassengers(passengersList);
  // };

  const getVehicleURL = async (passreqid) =>{
    
    const [CID,filename] = passengerRequests[passreqid-1].PassVehicleDetailsHash.split(";");
    const URL = "https://"+CID+".ipfs.w3s.link/"+filename;
    const URL2 = decodeURIComponent(URL);    
    return URL2;

  }

  

  const loadPassengerRequests = async (contract) => {
    const numPassRequests = await contract.methods.GetnumPassRequests().call();
    const passengerRequestsList = [];

    for (let i = 1; i <= numPassRequests; i++) {
      const requestDetails = await contract.methods.GetPassRequestDetails(i).call();
      passengerRequestsList.push({
        PassRequestID: requestDetails[0],
        PassName: requestDetails[1],
        PassWalletAddress: requestDetails[2],
        PassHomeAddress: requestDetails[3],
        PassEMail: requestDetails[7],
        PassVehicleName: requestDetails[8],
        PassVehicleNumber: requestDetails[9],
        PassVehicleDetailsHash: requestDetails[4],
        PassGender: requestDetails[5],
        PassRequestStatus: requestDetails[6],
      });
    }
  

    setPassengerRequests(passengerRequestsList);
  };


  const handleUserDetails=async() =>{
    // loadPassengers(contract);
    // console.log(passengerID);
    // console.log(PassengerID);
    // console.log(typeof(PassengerID));
//     const temp = parseInt(passengerID);
// console.log(typeof(temp));

    // const requestDetails = await contract.methods.GetPassRequestDetails(parseInt(passengerID)).call();
    console.log(passengers[parseInt(passengerID)-1]);
    // setUserDetails(requestDetails);
    console.log(userDetails);
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

<div className="heading" style={{alignSelf:'center'}}><h2 style={{fontWeight:"700", fontSize:"xx-large", color:"black"}}>Welcome aboard,User!</h2></div>
    <div className="AllinAll">
    <div className="profilesec">
        <div className="profilephotu">
        <img src="" alt="Profile img"></img>
        </div>
        <div className="UserDetails">
            <div style={{fontSize:"30px",fontWeight:"bold",paddingBottom:"3vw"}}>{isLoading?" ":passengers[passengerID-1].PassName}</div>
            <div style={{marginTop:"-5vh",marginBottom:"0.5vw" }}><b>Email-ID:</b> <u>{isLoading?" ":passengers[passengerID-1].PassEMail}</u></div>
            <div style={{marginBottom:"0.5vw"}}><b>Community Review:</b> {isLoading?" ":passengers[passengerID-1].PassReview}<FaStar/></div>
            <div style={{marginBottom:"0.5vw"}}><b>Date Joined:</b> </div>
            <div style={{marginBottom:"0.5vw"}}><b>Rides Hosted: </b>{isLoading?" ":passengers[passengerID-1].PassRidesHosted}</div>
            <div style={{marginBottom:"0.5vw"}}><b>Rides Taken: </b>{isLoading?" ":passengers[passengerID-1].PassRidesTaken}</div>   
        </div>
    
        
        
        </div>    

        <div>

        </div>
        
        <div style={{display:'flex', flexDirection:"column"}}>
        <div className="walletwagera">
        <div style={{marginTop:"1vw"}}><b>Location: </b>{isLoading?" ":passengers[passengerID-1].PassHomeAddress}</div>
        <div><b>Metamask Wallet Address: </b>{isLoading?" ":passengers[passengerID-1].PassWalletAddress}</div>
        <div><b>Registered Vehicle:</b> {isLoading?" ":passengers[passengerID-1].PassVehicleName === "" ? "NA" : `${passengers[passengerID-1].PassVehicleName}, ${passengers[passengerID-1].PassVehicleNumber}`}</div>
        </div>
        <div className="RewardReferral">
        <div style={{marginTop:"0.75vw"}}><b>COMMUTE.IO Passenger ID: </b>{passengerID}</div>
        <div><b>Reward Points: </b>0</div>
        <div><b>Referral Link: </b>Not Made</div>
        </div>
        </div>
       

    
    </div>
    <div className="importantbaat" style={{alignSelf:"center"}}>
            <div className="greenbox">Aise hi panchayat</div>
        </div>         
</div>)}

{isLoading && (<div className="loading-spinner">
      <div className="spinner"></div>
    </div>)}

</div>
)

}

export default DashboardPage;

