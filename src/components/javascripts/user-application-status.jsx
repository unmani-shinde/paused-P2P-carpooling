import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import CommuteIOABI from '../ABI/contracttestingABI.json';
import "../stylesheets/administrator-dashboard-requests.css";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { style } from '@mui/system';
import { useRef } from 'react';
import { Web3Storage } from 'web3.storage';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import imageh from "../javascripts/mwhahahaha.png";


const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY1OTAxNDU4NzEsIm5hbWUiOiJjb21tdXRlLWlvLWZpbGUtdXBsb2FkIn0.1E8NnGBcSwApaWAm6mY6F4I1hZWQKhFDCkeOMYrSp7E';
const web3Storage = new Web3Storage({ token: apiKey });


const contractAddress = '0x9D66687E6Da2BC0A5444125A8fA389C3e96F1921';

function AdministratorDashboardUserApplicationStatus (){

    const [clicked1, setClicked1] = useState(false);
    const [clicked2, setClicked2] = useState(false);
    const [clicked3, setClicked3] = useState(false);
    const [clicked4, setClicked4] = useState(false);
    const [web3, setWeb3] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [passengerRequests, setPassengerRequests] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [selectedRequestID, setSlectedRequestID] = useState(0);
    const [showRequestDetails,setShowRequestDetails] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");
    const [isFileSubmitted, setIsFileSubmitted] = useState(false);
    const [isChoosingVehicle, setIsChoosingVehicle] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isExistingApplication, setIsExistingApplication] =useState(false);
    const [isFreshApplication, setIsFreshApplication] = useState(false);
    const [isOriginalSection, setIsOriginalSection] = useState(true);
    const [userRequestID, setUserRequestID] = useState(0);
    const [userDetails, setUserDetails] = useState([]);
    const [revealedPassID,setRevealedPassID] = useState('');



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
          await loadPassengerRequests(contract);

          // Load the passenger details
          await loadPassengers(contract);
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


  const handleSkipClick = () => {
    setShowModal(true);
  };

  const handleRevealPassID = () => {
    passengers.forEach((passenger) => {
      if (passenger.PassWalletAddress === accounts[0]) {
        setRevealedPassID(passenger.PassID);
        return; // Exit the loop after finding the matching passenger
      }
    });
  };
  

  const handleCloseModal = () =>{
    setShowModal(false)
  };

  const handleUserRequestIDChange = (event) => {
    setUserRequestID(event.target.value);
  };

  const handleExistingApplication = () =>{
    setIsExistingApplication(true);
  }

  const handleHideExistingApplication = () =>{
    setIsExistingApplication(false);
  }

  const handleHideOriginalSection = () =>{
    setIsOriginalSection(false);
  }

  const handleOriginalSection = () =>{
    setIsOriginalSection(true);
  }

  const handleUserDetails=async() =>{
    console.log(userRequestID);
    const requestDetails = await contract.methods.GetPassRequestDetails(userRequestID).call();
    setUserDetails(requestDetails);
    console.log(userDetails);
  }


  const loadPassengers = async (contract) => {
    const numPassengers = await contract.methods.GetnumPassengers().call();
    const passengersList = [];

    for (let i = 1; i <= numPassengers; i++) {
      const passengerDetails = await contract.methods.GetPassDetails(i).call();
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
  };

  const getVehicleURL = async (passreqid) =>{
    
    const [CID,filename] = passengerRequests[passreqid-1].PassVehicleDetailsHash.split(";");
    const baseWeb3StorageUrl = 'https://ipfs.io/ipfs/';
    const file = `/${filename}`;
    const URL = `${baseWeb3StorageUrl}${CID}${file}`; 
    return URL;

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

  return(
    <div className='administrator-dashboard-requests-container' style={{backgroundColor:"#F1EEE5", marginTop:"1vh",marginLeft:"1vw",width:"98vw", height:"98vh", display:"flex", flexDirection:"column", border:"solid 1px black", borderRadius:"20px"}}>
        <div className='administrator-dashboard-requests-navbar' style={{backgroundColor:"#FFFFFF",width:"97.75vw", height:"10vh", display:"flex", flexDirection:"row", textAlign:"center", borderRadius:"20px 20px 0px 0px", paddingLeft:"1vh", paddingTop:"1vh"}}>
            <ul style={{listStyle:"none", display:"flex", flexDirection:"row"}}>
                <li style={{marginTop:"1vh"}}><button style={{marginLeft:"0.5vw",backgroundColor:"transparent",color:"black", fontWeight:"700", fontSize:"40px", marginTop:"-1vh",paddingRight:"10vw",marginBottom:"5vh", height:"5vh"}}><a href='/' style={{border:"none",color:"black"}}>COMMUTE.IO</a></button></li>
            </ul>
        </div><br></br>
        <h2 style={{fontWeight:"700", fontSize:"xx-large",textAlign:'center',color:'black'}}>COMMUTE.IO VERIFICATION PORTAL</h2>
        <h5 style={{fontWeight:"700",fontSize:"x-large",textAlign:'center',color:'black'}}>We're thrilled to have you here.</h5>
        
        {isOriginalSection && !isExistingApplication && !isFreshApplication && (
           <div style={{display:"flex", flexDirection:"row", alignSelf:"center",backgroundColor:'transparent', border:"1px solid black", height:'50vh',padding:"3vw",width:"70vw",marginTop:'5vh',boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)"}}>
            <div style={{display:"flex", flexDirection:"row",  width:"450vw", height:"40vh", alignSelf:'center',boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)"}}>
            <div style={{display:"flex", flexDirection:"column", alignSelf:"center", paddingTop:'8vh',marginRight:"2vw", width:'25vw',height:'30vh',marginLeft:"5.5vw",textAlign:'center'}}><p style={{textAlign:'center',fontWeight:"700",fontSize:'23px',marginTop:'-2vh'}}>Do you already have an  <br></br>application in progress?</p><button onClick={() => {
  handleExistingApplication();
  handleHideOriginalSection();
}} style={{
  padding: '10px 20px',
  backgroundColor: '#116D6E',
  color: '#ffffff',
  width:'14vw',
  alignSelf:'center',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '1vh',
}}>View Application<br />Status Here</button>

 </div>
 <div style={{display:"flex", flexDirection:"column", alignSelf:"center", paddingTop:'8vh',marginRight:"2vw", width:'25vw',height:'30vh',marginLeft:"1vw",textAlign:'center'}}><p style={{textAlign:'center',fontWeight:"700",fontSize:'23px',marginTop:'-2vh'}}>Do you wish to create <br></br>a fresh application?</p><button style={{
  padding: '10px 20px',
  backgroundColor: '#116D6E',
  color: '#ffffff',
  width:'14vw',
  alignSelf:'center',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)",
  marginTop: '1vh',
}} ><Link style={{color:'#FEFEFA'}} to={`/new-application-for-passenger`} className="freshApplication">Initiate New <br></br>Application</Link></button></div>  
         </div>
            </div>
          
        )}

        {isExistingApplication && (
          <div style={{transform:'scale(1.1)',backgroundColor:'#FEFEFA',display:"flex", flexDirection:"row", alignSelf:"center",height:'60vh',padding:"3vw",width:"70vw",marginTop:'4vh',borderRadius:'20px',boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)"}}>
            <div style={{width:'30vw'}}><img src={imageh} style={{transform:"scale(1.1)",height:"45vh",borderRadius:'20px'}}></img></div>
            <div style={{display:"flex", flexDirection:"column", backgroundColor:"transparent", width:"45vw", height:"55vh", alignSelf:'center',marginRight:"-2vw"}}>
            <h4 style={{fontWeight:"700", marginTop:"4vh",color:"black",textAlign:'center'}}>Enter your request ID to check <br></br>your application status</h4>
          <input placeholder="Request ID" value={userRequestID}
      onChange={handleUserRequestIDChange} style={{width:"30vw",border:"solid 1px black", marginTop:"1vw", borderRadius:"0px", backgroundColor:"transparent", alignSelf:'center',textAlign:'center'}} type="text" required /><h4 style={{fontWeight:"700", marginTop:"2vh",color:"black",textAlign:'center'}}>Connected Metamask <br></br>Wallet Address</h4>
      
          <input placeholder={accounts[0]} style={{width:"35vw",alignSelf:'center', border:"solid 1px black", textAlign:'center',marginTop:"1vw", borderRadius:"0px", backgroundColor:"transparent"}} type="text" readOnly />
          <div style={{alignSelf:'center'}}>
            <button style={{
  padding: '10px 20px',
  backgroundColor: '#116D6E',
  color: '#ffffff',
  width:'14vw',
  alignSelf:'center',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '2vh',
  marginRight:'2vw'
}} onClick={() => {
  handleHideExistingApplication();
  handleOriginalSection();
}}>
Go Back</button>
<button
  style={{
    padding: '10px 20px',
    backgroundColor: '#116D6E',
    color: '#ffffff',
    width:'16vw',
    alignSelf:'center',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '2vh',
    
  }} 
  onClick={() => {
    loadPassengerRequests(contract);
    if( passengerRequests.length>0 && passengerRequests[userRequestID-1].PassWalletAddress!=accounts[0]){alert("Your Request ID did not return the associated Metamask Wallet Address. Please switch to the correct account and try again.")}
    handleUserDetails();
    handleSkipClick();
  }}
>
  View Application Status
</button>


<Modal show={showModal && passengerRequests.length>0 && (accounts[0]==passengerRequests[userRequestID-1].PassWalletAddress)} onHide={handleCloseModal} size="lg" centered backdrop="static">
<Modal.Header>
  <h3 style={{fontWeight:"700",color:'black'}}>Passenger Application Details</h3>
  </Modal.Header>

        <Modal.Body style={{textAlign:"center"}}>
        <div style={{backgroundColor:"transparent",margin:"1vh"}}>
                  
                  <h3 style={{fontWeight:"700", fontSize:"x-large",color:'black'}}>REQUEST ID: {userRequestID}</h3>
                  <h3 style={{fontWeight:"700", fontSize:"x-large",color:'black',textAlign:'left'}}>Personal Details</h3>            
                  <table>
                  <tbody>
                    <tr style={{height:"1vh",marginBottom:"2vh"}}>
                     <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh"}}>Requestor's Full Name: </td>
                      <td style={{textAlign:'left',fontSize:"larger"}}>{userDetails[1]}</td>
                    </tr>
                    <tr style={{height:"1vh",marginBottom:"2vh"}}>
                      <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh"}}>Requestor's EMail: </td>
                      <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh"}}>{userDetails[7]}</td>
                    </tr>
                    <tr style={{height:"1vh"}}>
                      <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh"}}>Requestor's Wallet Address: </td>
                      <td style={{textAlign:'left',fontSize:"larger"}}>{userDetails[2]}</td>
                    </tr>
                    <tr style={{height:"1vh"}}>
                      <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh"}}>Requestor's Home Address: </td>
                      <td style={{textAlign:'left',fontSize:"larger"}}>{userDetails[3]}</td>
                    </tr>
                    <tr style={{height:"1vh"}}>
                      <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh"}}>Requestor's Gender: </td>
                      <td style={{textAlign:'left',fontSize:"larger"}}>{userDetails[5]}</td>
                    </tr>
                    </tbody>
                    </table>
                      
                    {!(userDetails[4]==" ") && (
                       <h3 style={{fontWeight:"700", fontSize:"x-large",color:'black',textAlign:'left',marginBottom:'2vh'}}>Vehicle Details</h3>   
                    )}
                    

                    {!(userDetails[4]==" ") && (                    
                    <table style={{width:'50vw',border:'1px solid black'}}>
                      <tbody>
                    <tr style={{height:"1vh"}}>
                      <td style={{width:"16vw"}}><b>Vehicle Type and</b> <br></br> <b>Name</b></td>
                      <td style={{width:"16vw"}}><b>Vehicle Number</b> <br></br> <b>Plate</b></td>
                      <td style={{width:"16vw"}}><b>Vehicle</b> <br></br> <b>Papers</b></td>
                      
                    </tr>
                    <tr style={{height:"1vh"}}>
                      <td style={{width:"10vw",textAlign:'center'}}>{userDetails[8]}</td>
                      <td style={{width:"10vw",textAlign:'center'}}>{userDetails[9]}</td>
                      <td style={{width:"10vw",textAlign:'center'}}><button disabled={!(userDetails[4])}
  onClick={(event) => {
    event.preventDefault();
    getVehicleURL(userRequestID)
      .then((vehicleURL) => {
        window.open(vehicleURL, "_blank");
      })
      .catch((error) => {
        console.error("Error retrieving vehicle URL:", error);
      });
  }}
  style={{ backgroundColor: "transparent",fontWeight:'700' ,color: "#0A4D68", marginLeft: "-2vh" }}
>
  View Vehicle Papers
</button>

</td>
                    </tr>
                    </tbody>
                    </table>)}
                    <div style={{display:'flex',flexDirection:'column',height:'30vh'}}>

                    <div style={{display:'flex',flexDirection:'row'}}>
                    <h3 style={{fontWeight:"700", fontSize:"x-large",color:'black',textAlign:'left',marginTop:'2vh',marginBottom:'2vh'}}>Application Status</h3>
                    {userDetails[6] == 1 && (
                        <div style={{border:"2px solid #03C988",width:"20vw",height:'5vh',marginTop:'2vh',marginLeft:'2vw'}}>
                        <h4 style={{textAlign:'center',color:"#03C988",fontWeight:"700", fontSize:"larger"}}>APPROVED</h4>                        
                        {/* <h4 style={{textAlign:'left',color:"black",fontSize:"large"}}>Passenger ID: </h4> */}
                        </div>
                      )}
                      {userDetails[6]== 2 && (
                        <div style={{border:"2px solid #F24C3D",width:"20vw",height:'5vh',marginTop:'2vh',marginLeft:'2vw'}}>
                          <h4 style={{textAlign:'center',color:"#F24C3D",fontWeight:"700", fontSize:"larger"}}>REJECTED</h4>

                            </div>
                      )}

                      {userDetails[6] == 0 && (
                        <div style={{border:"2px solid #000000",width:"20vw",height:'5vh',marginTop:'2vh',marginLeft:'2vw'}}>
                          <h4 style={{textAlign:'center',color:"#000000",fontWeight:"700", fontSize:"larger"}}>PENDING</h4>

                            </div>
                      )}

                    </div>

                    {userDetails[6] == 1 && (
                    <div>
                       <hr style={{ height: '1px', backgroundColor: 'black', border: 'none' }} />
                       <h4 style={{color:'black',fontSize:"larger"}}>Click below to reveal your <b>Passenger ID</b> for COMMUTE.IO</h4>
                       <h4 style={{color:'black',fontSize:"larger"}}>Please note that this ID will hereonwards be used for all identification purposes on this platform.</h4>
                     {revealedPassID=="" &&(<button style={{backgroundColor:'#116D6E',color:'white', padding:"1vh",borderRadius:'5px'}} onClick={handleRevealPassID}><h5 style={{fontWeight:'700'}}>Reveal Passenger ID</h5></button> ) }
                     {!(revealedPassID=="")&& (<h5 style={{ color: 'black', fontSize: 'x-large',fontWeight:"700" }}>Passenger ID: {revealedPassID}</h5>)}
                    </div>)}






                    </div>
                   
                    
                    </div>    
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseModal} style={{backgroundColor:"#14C38E",padding:'1vh',borderRadius:'10px'}}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
</div>
          


            </div>
            
            
            </div>
        )

        }
       
        
        
        
        
        </div>)}

export default AdministratorDashboardUserApplicationStatus;
