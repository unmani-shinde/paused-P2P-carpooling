import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import CommuteIOABI from '../ABI/contracttestingABI.json';
import "../stylesheets/administrator-dashboard-requests.css";

import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { style } from '@mui/system';

const contractAddress = '0x9D66687E6Da2BC0A5444125A8fA389C3e96F1921';

function AdministratorDashboardPassengers (){

    const [clicked1, setClicked1] = useState(false);
    const [clicked2, setClicked2] = useState(false);
    const [clicked3, setClicked3] = useState(false);
    const [clicked4, setClicked4] = useState(false);
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [passengerRequests, setPassengerRequests] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [selectedPassID, setSlectedPassID] = useState(0);
    const [showPassengerDetails,setShowPassengerDetails] = useState(false);
    const [roleAdmin,setRoleAdmin] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const history = useHistory();
//   const [groundsofReject, setGroundsofReject] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [showAlertModal, setShowAlertModal] = useState(false);
//   const [showRejectAlertModal, setShowRejectAlertModal] = useState(false);
  

//   const handleSkipClick = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };


//   const handleCloseAlertModal = () => {
//     setShowAlertModal(false);
//   };

//   const handleCloseRejectAlertModal = () => {
//     setShowRejectAlertModal(false);
//   };





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
          if (accounts[0]=='0x6c03F36B57Ad95aeAC06ad1dD100da00d4936aF5'){
            setRoleAdmin(true);
          }
          // Load the passenger requests
          await loadPassengerRequests(contract);
          // Load the passenger details
          await loadPassengers(contract);
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

  const getVehicleURL = async (passreqid) =>{
    
    const [CID,filename] = passengers[passreqid-1].PassVehicleDetailsHash.split(";");
    const baseWeb3StorageUrl = 'https://ipfs.io/ipfs/';
    const file = `/${filename}`;
    const URL = `${baseWeb3StorageUrl}${CID}${file}`; 
    return URL;

  }
  const loadPassengerRequests = async (contract) => {
    const numPassRequests = await contract.methods.GetnumPassRequests().call();
    const passengerRequests = [];

    for (let i = 1; i <= numPassRequests; i++) {
      const requestDetails = await contract.methods.GetPassRequestDetails(i).call();
      passengerRequests.push({
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

    setPassengerRequests(passengerRequests);
  };

//   const approvePassengerRequest = async (passreqid) => {
//     await contract.methods.ApprovePassengerRequest(passreqid).send({ from: accounts[0] });
//     await loadPassengerRequests(contract);
//     await loadPassengers(contract);
//     setShowAlertModal(true);
//     setShowModal(false)
//     //alert("Passenger Request Approved.");
//     loadPassengers(contract);
//   };


//   const heheheheeahaaaa = async (passreqid) => {
//     // Assuming passengerRequests is populated asynchronously
//    // Await the function or promise that populates passengerRequests
//     const bohotdumbcheez="";
//     const det = passengerRequests[passreqid - 1].PassVehicleDetailsHash; 
//     console.log(det);
//     const [timepass,timepass2, grounds] = passengerRequests[passreqid - 1].PassVehicleDetailsHash.split(";");
//     console.log(grounds);
//     return grounds;
//   };
  
 
//   const rejectPassengerRequest = async (passreqid) => {
//     // const groundsofRejection = prompt("Enter the grounds of rejection of this application: ");
//     // setGroundsofReject(groundsofRejection);
//     // console.log(passengerRequests[passreqid-1].PassVehicleDetailsHash);
//     // const temp=passengerRequests[passreqid-1].PassVehicleDetailsHash+";"+groundsofRejection;
//     // passengerRequests[passreqid-1].PassVehicleDetailsHash = temp;
//     await contract.methods.RejectPassengerRequest(passreqid).send({ from: accounts[0] });
//     await loadPassengerRequests(contract);
//     setShowRejectAlertModal(true);
//     setShowModal(false);
//     alert("Passenger Request Rejected.")
//     loadPassengers(contract);
//   };

    const handleClick1 = () => {
        setClicked1(!clicked1);
        setClicked4(false);
        setClicked2(false);
        setClicked3(false);
        history.push(`/passenger-requests`);
      };
    
      const handleClick2 = () => {
        setClicked2(!clicked2);
        setClicked1(false);
        setClicked4(false);
        setClicked3(false);
        history.push(`/enrolled-passengers`)
      };
      const handleClick3 = () => {
        setClicked3(!clicked3);
        setClicked1(false);
        setClicked2(false);
        setClicked4(false);
      };
      const handleClick4 = () => {
        setClicked4(!clicked4);
        setClicked1(false);
        setClicked2(false);
        setClicked3(false);
      };

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
    

    //   const handleRequestSelection = (reqid) =>{
    //     setSlectedRequestID(reqid);
    //   }

      const handleViewPassengerDetails = () =>{
        setShowPassengerDetails(true);
      }

      const handleHidePassengerDetails = () =>{
        setShowPassengerDetails(false);
      }

    return(
      <div>
      {roleAdmin && !isLoading && (
        <div className='administrator-dashboard-requests-container' style={{backgroundColor:"#F1EEE5", marginTop:"1vh",marginLeft:"1vw",width:"98vw", height:"98vh", display:"flex", flexDirection:"column", border:"solid 1px black", borderRadius:"20px"}}>
        <div className='administrator-dashboard-requests-navbar' style={{backgroundColor:"#FFFFFF",width:"97.75vw", height:"10vh", display:"flex", flexDirection:"row", textAlign:"center", borderRadius:"20px 20px 0px 0px", paddingLeft:"1vh", paddingTop:"1vh"}}>
             <ul style={{listStyle:"none", display:"flex", flexDirection:"row"}}>
             <li style={{marginTop:"1vh"}}><button style={{backgroundColor:"transparent",color:"black", fontWeight:"700", fontSize:"35px", marginTop:"0vh",paddingRight:"10vw",marginBottom:"5vh", height:"5vh"}}><Link style={{color:'black'}}to={`/`}>COMMUTE.IO</Link></button></li>
             <li className='not-logo'><button onClick={handleClick1} className='administrator-dashboard-requests-navbar-buttons' style={{transition: '0.3s ease-in', borderBottom: clicked1?"4px solid #116D6E":"none"}}><Link style={{color:'#116D6E'}} to={`/passenger-requests`} className="passenger-requests">Request Records</Link></button></li>
                 <li className='not-logo'><button onClick={handleClick2} className='administrator-dashboard-requests-navbar-buttons' style={{transition: '0.3s ease-in', borderBottom: clicked2?"4px solid #116D6E":"none"}} ><Link style={{color:'#116D6E'}} to={`/enrolled-passengers`} className="enrolled-passengers">Enrolled Passengers</Link></button></li>
                 <li className='not-logo'><button onClick={handleClick3} className='administrator-dashboard-requests-navbar-buttons' style={{transition: '0.3s ease-in', borderBottom: clicked3?"4px solid #116D6E":"none"}}>Inbox</button></li>
                 <li className='not-logo'><button onClick={handleClick4} className='administrator-dashboard-requests-navbar-buttons' style={{transition: '0.3s ease-in', borderBottom: clicked4?"4px solid #116D6E":"none"}}><Link style={{color:'#116D6E'}} to={`/`} className="logout">Logout</Link></button></li>
             </ul>
         </div><br></br>
         <h2 style={{fontWeight:"700", fontSize:"x-large",textAlign:'center',color:'black',marginTop:"-3vh"}}>ENROLLED PASSENGERS' RECORDS</h2>
         <div style={{display:"flex", flexDirection:"row"}}>
           <div style={{border:"1px black solid", marginTop:"0vh",marginLeft:"2vw", width:"47vw", height:"80vh", maxHeight:"80vh", alignSelf:"center"}}>
             <div style={{ alignSelf:"center",marginTop:"2vh", marginLeft:"1vh", marginRight:"1vh", marginBottom:"1vh",width:"44vw", height:"76vh", position:"sticky", overflowY:"scroll", overflowX:"hidden"}}>
               <table style={{width:"41.5vw",marginLeft:"1vw", backgroundColor:"#FEFEFA", overflowY:"scroll", overflowX:"hidden", position:"sticky"}}>
               <tbody>
         
               {passengers.map((request) => (
                 <tr key={request.PassID} style={{height:"10vh", border:"solid 1px black"}}>
                   <td style={{width:"30vw",paddingLeft:'1vw'}}><b>Passenger ID:</b> {request.PassID}</td>
             
                   <td style={{width:"17vw"}}><button onClick={() => {setSlectedPassID(request.PassID);handleViewPassengerDetails();}} style={{width:"17vw",backgroundColor:"#116D6E",color:"#FEFEFA",padding:'1vh', marginLeft:"-3vw"}} ><b>View Passenger Details</b></button></td>
                 </tr>
                 ))}

               </tbody>
   
             </table>                    
               
               
           
             </div>
             </div>
           <div style={{border:"1px black solid",marginLeft:"2vw", width:"46vw", maxHeight:"80vh",height:"80vh", marginRight:"2vw"}}>
             {showPassengerDetails &&(<div style={{backgroundColor:"#FEFEFA",margin:"1vh",height:"76vh",width:"45vw"}}>

             <div style={{display:'flex',flexDirection:'column',alignSelf:'center'}}>
                <h3 style={{fontWeight:"700", fontSize:"x-large",color:"black",textAlign:'center'}}>PASSENGER ID: {selectedPassID}</h3>
                <button onClick={handleHidePassengerDetails} style={{backgroundColor:"transparent",fontSize:"larger",border:"2px solid #000000",color:"#116D6E",marginTop:'0vh',fontWeight:'700',padding:"0.5vh",width:"14vw",textAlign:'center',alignSelf:'center'}}>Close Details Pane</button>
                </div>
                <h3 style={{fontWeight:"700", fontSize:"x-large",color:'black',textAlign:'left',paddingLeft:'2vh'}}>Personal Details</h3>             
               
               <table>
               <tbody>
                 <tr style={{height:"1vh"}}>
                  <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh",paddingLeft:"2vh"}}>Requestor's Full Name: </td>
                   <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh",paddingLeft:"2vh"}}>{passengers[selectedPassID-1].PassName}</td>
                 </tr>
                 <tr style={{height:"1vh"}}>
                   <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh",paddingLeft:"2vh"}}>Requestor's EMail: </td>
                   <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh",paddingLeft:"2vh"}}>{passengers[selectedPassID-1].PassEMail}</td>
                 </tr>
                 <tr style={{height:"1vh"}}>
                   <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh",paddingLeft:"2vh"}}>Requestor's Wallet Address: </td>
                   <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh",paddingLeft:"2vh"}}>{passengers[selectedPassID-1].PassWalletAddress}</td>
                 </tr>
                 <tr style={{height:"1vh"}}>
                   <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh",paddingLeft:"2vh"}}>Requestor's Home Address: </td>
                   <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh",paddingLeft:"2vh"}}>{passengers[selectedPassID-1].PassHomeAddress}</td>
                 </tr>
                 <tr style={{height:"1vh"}}>
                   <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh",paddingLeft:"2vh"}}>Requestor's Gender: </td>
                   <td style={{textAlign:'left',fontSize:"larger",paddingBottom:"1vh",paddingLeft:"2vh"}}>{passengers[selectedPassID-1].PassGender}</td>
                 </tr>
                 </tbody></table>
                 {!(passengers[selectedPassID-1].PassVehicleDetailsHash==" ") && (<h3 style={{fontWeight:"700", fontSize:"larger"}}>Vehicle Details</h3>)}
           
                 {!(passengers[selectedPassID-1].PassVehicleDetailsHash==" ") && (
                 <table style={{width:'50vw'}}>
                   <tbody>
                   <tr style={{height:"1vh"}}>
                    <td style={{width:"16vw",paddingLeft:'2vh'}}><b>Vehicle Type and</b> <br></br> <b>Name</b></td>
                    <td style={{width:"16vw",paddingLeft:'2vh'}}><b>Vehicle Number</b> <br></br> <b>Plate</b></td>
                    <td style={{width:"16vw",paddingLeft:'2vh'}}><b>Vehicle</b> <br></br> <b>Papers</b></td>
                    
                  </tr>
                  <tr style={{height:"1vh"}}>
                    <td style={{width:"5vw",textAlign:'left',paddingLeft:'2vh'}}>{passengers[selectedPassID-1].PassVehicleName}</td>
                    <td style={{width:"5vw",textAlign:'left',paddingLeft:'2vh'}}>{passengers[selectedPassID-1].PassVehicleNumber}</td>
                    <td style={{width:"5vw",textAlign:'left',paddingLeft:'2vh'}}><button disabled={!(passengers[selectedPassID-1].PassVehicleDetailsHash)}
onClick={(event) => {
  event.preventDefault();
  getVehicleURL(selectedPassID)
    .then((vehicleURL) => {
      window.open(vehicleURL, "_blank");
    })
    .catch((error) => {
      console.error("Error retrieving vehicle URL:", error);
    });
}}
style={{ backgroundColor: "transparent",fontWeight:'700' ,color: "#0A4D68", marginLeft: "-2vh" }}
>
View Papers
</button>

</td>
                  </tr>
                 </tbody>
                 </table>)}
                 
                 

            
             
             </div>)}

             {!showPassengerDetails &&(<div style={{paddingTop:"35vh",textAlign:'center'}}>No passenger log selected yet.</div>)}
             
           </div>
         </div>
   
     </div>
      )}

<Modal show={!roleAdmin} size="lg" centered>
<Modal.Header>
<h4 style={{fontWeight:"700", color:'black'}}>Alert! Access Restricted</h4>
</Modal.Header>

      <Modal.Body style={{textAlign:"center"}}>
        <p>You do not have access to this page. Please switch to an administrator account in order to view this page and proceed further.</p>       
      </Modal.Body>
    </Modal>

    {(isLoading) &&(<div className="loading-spinner">
    <div className="spinner"></div>
  </div>) }

    


    </div>
        
    )
}

export default AdministratorDashboardPassengers;