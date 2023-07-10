import '../stylesheets/UserDashboard.css'
import io from "socket.io-client"
import {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';
import Chat from './Chat';
import Web3 from 'web3';
import CommuteIOABI from '../ABI/contracttestingABI.json';

import { style } from '@mui/system';

const socket = io.connect("http://localhost:4000");

const contractAddress = '0x9D66687E6Da2BC0A5444125A8fA389C3e96F1921';

function Inbox() {
  const  {passengerID}  = useParams();
  

  const [username,setUsername]=useState("")
  const [room,setRoom]=useState("")
  const [showChat,setShowChat]=useState(false)
  const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);

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

  const joinRoom = async() => {
    if (username!=="" && room !==""){
      console.log(passengerID)
      const rideDetails = await contract.methods.GetRideDetails(room).call();
      if (rideDetails[3]==passengerID || rideDetails[4].includes(passengerID)){
        socket.emit("join_room", room);
        setShowChat(true);
      }
      else{
        alert("Incorrect RideID")
      }
      

    }

  }


  return (
    <div style={{display:'flex',flexDirection:'column'}}>
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

    <div className="ChatApp">
  {!showChat ? (
    <div className='joinChatContainer'style={{alignSelf:'center'}}>
      <h3 style={{ color: "black", fontWeight: "700", paddingBottom: "20px",textAlign:'center'}}>Join RideChat</h3>
      <input type="text" style={{ width: "220px",alignSelf:'center' }} placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
      <input type="text" style={{ width: "220px",alignSelf:'center' }} placeholder="RideID" onChange={(e) => { setRoom(e.target.value) }} />
      <button className="Joinbutton" style={{ marginTop: "20px",alignSelf:'center'}} onClick={joinRoom}>Enter Ride Inbox</button>
    </div>
  ) : (
    <Chat socket={socket} username={username} room={room} />
  )}
</div>





    </div>
    

  );
}

export default Inbox;