import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import CommuteIOABI from '../ABI/contracttestingABI.json';
import "../stylesheets/administrator-dashboard-requests.css";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { style } from '@mui/system';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
import { Web3Storage } from 'web3.storage';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';


const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY1OTAxNDU4NzEsIm5hbWUiOiJjb21tdXRlLWlvLWZpbGUtdXBsb2FkIn0.1E8NnGBcSwApaWAm6mY6F4I1hZWQKhFDCkeOMYrSp7E';
const web3Storage = new Web3Storage({ token: apiKey });


const contractAddress = '0x303b3f8D8b2832A2044cb404Efe326d300BF590C';

function AdministratorDashboardUserRegistration (){

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
  const [name, setName] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [email, setEMail] = useState("");
  const [vehicleName, setVehicleName] = useState(" ");
  const [vehicleNumber, setVehicleNumber] = useState(" ");
  const [vehicleDetailsHash, setVehicleDetailsHash] = useState(" ");
  const [gender, setGender] = useState("");
  const [showRequestDetails,setShowRequestDetails] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isFileSubmitted, setIsFileSubmitted] = useState(false);
  const [isChoosingVehicle, setIsChoosingVehicle] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const carouselRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showRequestMadeModal, setShowRequestMadeModal] = useState(false);
  const [passDetailsID, setPassDetailsID] = useState("");
  const [isClicked, setIsClicked] =useState("");
  let isHandlingEvent = false;
  const [userRequestID, setUserRequestID] = useState(0);
  const [showRegistrationCompletionModal,setShowRegistrationCompletionModal] = useState(false);

  const history = useHistory();



  const handleSkipClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () =>{
    setShowModal(false)
  };

  const handleCloseRequestMadeModal = () => {
    setShowRequestMadeModal(false);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };


  const fileInputRef = useRef(null);

  
 
  const getFiles = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      return fileInputRef.current.files;
    }
    return null;
  };

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
          await loadPassengerRequests(contract);

          // Load the passenger details
          await loadPassengers(contract);

          contract.events
          .PassengerRequestCreated()
          .on('data', handlePassengerRequestCreated)
          .on('error', (error) => {
            console.error('Error listening to PassengerRequestCreated event:', error);
          });





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

  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY1OTAxNDU4NzEsIm5hbWUiOiJjb21tdXRlLWlvLWZpbGUtdXBsb2FkIn0.1E8NnGBcSwApaWAm6mY6F4I1hZWQKhFDCkeOMYrSp7E";
  }
  
  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }
  
 
  const storeFiles = async () => {
    const files = getFiles();
    const client = makeStorageClient();

    if (!files || files.length === 0) {
      console.error('No files selected.');
      return;
    }

    try {
      const cid = await client.put(files);
      const fileName = files[0].name;
      console.log(fileName);
      setUploadMessage("Your paperwork has been successfully added to our system!")
      setVehicleDetailsHash(cid+";"+fileName);
      setIsFileSubmitted(true);
    } catch (error) {
      setUploadMessage("Paperwork upload failed! Please try again later.")
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await storeFiles();
   

  };


  

//   const approvePassengerRequest = async (passreqid) => {
//     await contract.methods.ApprovePassengerRequest(passreqid).send({ from: accounts[0] });
//     await loadPassengerRequests(contract);
//     await loadPassengers(contract);
//     alert("Passenger Request Approved.");
//     loadPassengers(contract);
//   };

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
  
//   const rejectPassengerRequest = async (passreqid) => {
//     await contract.methods.RejectPassengerRequest(passreqid).send({ from: accounts[0] });
//     await loadPassengerRequests(contract);
//     alert("Passenger Request Rejected.")
//     loadPassengers(contract);
//   };

    // const handleClick1 = () => {
    //     setClicked1(!clicked1);
    //     setClicked4(false);
    //     setClicked2(false);
    //     setClicked3(false);
    //   };
    
    //   const handleClick2 = () => {
    //     setClicked2(!clicked2);
    //     setClicked1(false);
    //     setClicked4(false);
    //     setClicked3(false);
    //   };
    //   const handleClick3 = () => {
    //     setClicked3(!clicked3);
    //     setClicked1(false);
    //     setClicked2(false);
    //     setClicked4(false);
    //   };
    //   const handleClick4 = () => {
    //     setClicked4(!clicked4);
    //     setClicked1(false);
    //     setClicked2(false);
    //     setClicked3(false);
    //   };

    //   const handleRequestSelection = (reqid) =>{
    //     setSlectedRequestID(reqid);
    //   }

    //   const handleViewApplicationDetails = () =>{
    //     setShowRequestDetails(true);
    //   }

    //   const handleHideApplicationDetails = () =>{
    //     setShowRequestDetails(false);
    //   }

    const handleNameUpdate = async () => {
      setName(firstName + " " + lastName);
    }

    const handleRegistrationModal = async () => {
      setShowRegistrationCompletionModal(false);
      history.push(`/commute-io-verification-portal`);
    }

    
 

    function handlePassengerRequestCreated(event) {
      if (isHandlingEvent) {
        return; // Do not execute the function if it's already being handled
      }

      else{
        const requestId = event.returnValues.ID;
        const name_ = event.returnValues.NAME;
        setUserRequestID(requestId);      
        isHandlingEvent = true;
      }
      
    
    }
    
    
  
    const createPassengerRequest = async () => {
        
        try {
          await handleNameUpdate();                   
          // Call the contract function to create the passenger request
          await contract.methods
            .CreatePassengerRequest(name, homeAddress, vehicleDetailsHash, gender, email, vehicleName, vehicleNumber)
            .send({ from: accounts[0] });

          // Reload the passenger requests
          await loadPassengerRequests(contract);
          setShowRequestMadeModal(true);

        } catch (error) {
          console.error('Error creating passenger request:', error);
          alert('An error occurred while creating the passenger request. Please try again.');
        }
      };
      

    return(
      <div className='administrator-dashboard-requests-container' style={{backgroundColor:"#F1EEE5", marginTop:"1vh",marginLeft:"1vw",width:"98vw", height:"98vh", display:"flex", flexDirection:"column", border:"solid 1px black", borderRadius:"20px"}}>
      <div className='administrator-dashboard-requests-navbar' style={{backgroundColor:"#FFFFFF",width:"97.75vw", height:"10vh", display:"flex", flexDirection:"row", textAlign:"center", borderRadius:"20px 20px 0px 0px", paddingLeft:"1vh", paddingTop:"1vh"}}>
          <ul style={{listStyle:"none", display:"flex", flexDirection:"row"}}>
              <li style={{marginTop:"1vh"}}><button style={{backgroundColor:"transparent",color:"black", fontWeight:"700", fontSize:"40px", marginTop:"-1vh",paddingRight:"10vw",marginBottom:"5vh", height:"5vh"}}>COMMUTE.IO</button></li>
          </ul>
      </div><br></br>
      <h2 style={{fontWeight:"700", fontSize:"xx-large",textAlign:'center',color:'black'}}>COMMUTE.IO VERIFICATION PORTAL</h2>
      <h5 style={{fontWeight:"700",fontSize:"x-large",textAlign:'center',color:'black'}}>We're thrilled to have you here.</h5>

          <Carousel style={{border:"1px solid black", width:"70vw", height:"70vh", alignSelf:"center"}} variant='dark'>
            <Carousel.Item >
              <div style={{backgroundColor:" #FEFEFA", display:"flex", flexDirection:"column", height:"65vh", margin:"1vw"}}>
              <h5 style={{fontWeight:"700" ,marginBottom:"-1vh", paddingTop:"1vh"}}>Tell us more about you.</h5>
              <table style={{padding:"5vh",marginTop:"-3vh"}}>
              <tbody>
                <tr style={{height:"15vh"}}>
                  <td><label style={{paddingLeft:'1vw',fontSize:'18px',fontWeight:'700'}}>What's your Full Name Name?</label></td>
                  <td style={{width:"50vw"}}><input placeholder="Name" style={{width:"50vw",marginRight:"5vh", border:"solid 1px black", marginTop:"1vw", borderRadius:"0px", backgroundColor:"transparent"}} type="text" value={name} onChange={(e) => setName(e.target.value)} required /></td>
                  
                </tr>
                <tr style={{height:"15vh", padding:"5vh"}}>
                  <td><label style={{paddingLeft:'1vw',fontSize:'18px',fontWeight:'700'}}>Where do you stay?:</label></td>
                  <td><input placeholder="Home Location" style={{width:"50vw", border:"solid 1px black", marginTop:"3vh", borderRadius:"0px", backgroundColor:"transparent"}} type="text" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required /></td>
                </tr>
                <tr style={{height:"15vh", padding:"5vh"}}>
                  <td><label style={{paddingLeft:'1vw',fontSize:'18px',fontWeight:'700'}}>What's your EMail?:</label></td>
                  <td><input placeholder="EMail Address" style={{width:"50vw", border:"solid 1px black", marginTop:"1vh", borderRadius:"0px", height:"7vh",paddingLeft:"1.5vh", backgroundColor:"transparent"}} type="text" value={email} onChange={(e) => setEMail(e.target.value)} required /></td>
                </tr>

                <tr style={{height:"15vh", padding:"5vh"}}>
                  <td><label style={{paddingLeft:'1vw',fontSize:'18px',fontWeight:'700'}}>What's your Gender?:</label></td>
                  <td><input placeholder="Gender" style={{width:"50vw", border:"solid 1px black", marginTop:"1vh", borderRadius:"0px", height:"7vh",paddingLeft:"1.5vh", backgroundColor:"transparent"}} type="text" value={gender} onChange={(e) => setGender(e.target.value)} required /></td>
                </tr>

              </tbody>
            </table>    
              </div>
            
               
            </Carousel.Item>

            <Carousel.Item>
            <div style={{backgroundColor:" #FEFEFA", display:"flex", flexDirection:"column", height:"65vh", margin:"1vw"}}>
            <h5 style={{fontWeight:"700",paddingTop:"5vh",color:"black",textAlign:'center'}}>Which Vehicle would you be driving?</h5>
            <h5 style={{color:"black",textAlign:'center'}}>PS. You can skip this section if you wish to enter without one!</h5>
            <div style={{display:"flex", flexDirection:"row", alignSelf:"center", paddingTop: !(isChoosingVehicle)? "15vh":"1vh"}}>
            <button onClick={() => setIsChoosingVehicle(true)} style={{ backgroundColor: "#14C38E",fontWeight:"700", padding:'1.5vh',width:"16vw",color: "#FFFFFF", border: "none", alignSelf:"center", marginRight:"4vw",borderRadius:'10px',}}>
  I have my own vehicle
</button>
<button onClick={() => {
  setIsChoosingVehicle(false);
  handleSkipClick(); 
}} style={{ backgroundColor: "#EB5353", fontWeight:"700", padding:'1.5vh',width:"13vw",color: "#FFFFFF", border: "none", alignSelf:"center", marginRight:"4vw",borderRadius:'10px' }}>
  Skip this for me
</button>


<Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
<Modal.Header>
  <h4 style={{fontWeight:"700", color:'black'}}>Alert</h4>
  </Modal.Header>

        <Modal.Body style={{textAlign:"center"}}>
          <div style={{alignSelf:"center", textAlign:"center"}}>
          <h5 style={{alignSelf:"center", fontWeight:"700",color:"black"}}>Hey there!</h5>
          </div>
          <p>Your request to access our platform without a host vehicle has been acknowledged. You may now close this alert and proceed to the next section of the application.</p>       
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseModal} style={{backgroundColor:"#14C38E",padding:'1vh',color:'#FEFEFA',fontWeight:'700',borderRadius:"10px"}}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

            </div>
            

            { isChoosingVehicle &&( 
            <table>
              <tbody>
              <tr style={{height:"15vh", padding:"5vh"}}>
                  <td><label style={{paddingLeft:'1vw',fontSize:'18px',fontWeight:'700'}}>Vehicle Name and Type:</label></td>            
                  <td><input placeholder="Vehicle Name" style={{width:"50vw", border:"solid 1px black", marginTop:"5vh", borderRadius:"0px", backgroundColor:"transparent",marginBottom:"5vh"}} type="text" value={vehicleName} onChange={(e) => setVehicleName(e.target.value)} required /></td>
              </tr>
              <tr style={{height:"15vh", padding:"5vh"}}>
                  <td><label style={{paddingLeft:'1vw',fontSize:'18px',fontWeight:'700'}}>Vehicle Number:</label></td>            
                  <td><input placeholder="Vehicle Number Plate" style={{width:"50vw", border:"solid 1px black", marginTop:"3vh", borderRadius:"0px", backgroundColor:"transparent"}} type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required /></td>
              </tr>                
              </tbody>
            </table>)
            }        
       
            </div> 
            </Carousel.Item>

            {isChoosingVehicle && 
            (<Carousel.Item>
 
    <div style={{ backgroundColor: "#FEFEFA", display: "flex", flexDirection: "column", height: "65vh", margin: "1vw" }}>
      <h5 style={{ fontWeight: "700", paddingTop: "5vh",color:"black",textAlign:'center'}}>Time for the Paperwork!</h5>
      <h5 style={{color:"black",textAlign:'center'}}>Please share with us a copy of your registered vehicle papers</h5>
      <h5 style={{ fontWeight: "700", color: "#EB5353", alignSelf: "center" }}>
                  File once uploaded cannot be changed before review.
                </h5>
     
      <table>
        <tbody>
          <tr>
            <td>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <input
                  disabled={isFileSubmitted}
                  type="file"
                  ref={fileInputRef}
                  style={{
                    border: "solid 1px black",
                    alignSelf: "center",
                    marginTop: "3vh",
                    padding: "3vh",
                    marginBottom: "3vh",
                    cursor: isFileSubmitted ? "not-allowed" : "pointer",
                  }}
                />
               
                <button
                  disabled={isFileSubmitted}
                  type="submit"
                  style={{
                    alignSelf: "center",
                    color: isFileSubmitted ? "#000000" : "#FFFFFF",
                    backgroundColor: isFileSubmitted ? "transparent" : "#14C38E",
                    border: isFileSubmitted ? "2px solid #000000" : "none",
                    padding: "2vh",
                    width: isFileSubmitted ? "15vw" : "10vw",
                    cursor: isFileSubmitted ? "not-allowed" : "pointer",
                    fontWeight: "700",
                  }}
                >
                  {isFileSubmitted ? "Paperwork Uploaded" : "Upload File"}
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ display: "flex", flexDirection: "column", alignSelf: "center" }}>
        {vehicleDetailsHash && (
          <h5 style={{ alignSelf: "center", marginBottom: "3vh",color:"black",textAlign:'center' }}>
            Your Vehicle Details ID: <br /> <b>{vehicleDetailsHash}</b>
          </h5>
        )}
        {vehicleDetailsHash && (
          <div style={{ alignSelf: "center" }}>
            <h5>{uploadMessage}</h5>
          </div>
        )}
      </div>
    </div>
</Carousel.Item>)}

            



            <Carousel.Item>
            <div style={{backgroundColor:" #FEFEFA", display:"flex", flexDirection:"column", height:"65vh", margin:"1vw"}}>
            <h5 style={{fontWeight:"700",paddingTop:"1vh", textDecoration:"underline",color:'black',textAlign:'center'}}>Last Step: Some Points to Note Down</h5>
            <h5 style={{marginTop:"1vw",marginBottom:"1vw",color:'black',textAlign:'center'}}>If you are a Vehicle Bearer:</h5>
            <h5 style={{marginBottom:"1vw",color:'black',textAlign:'center'}}>1.Make sure to re-check your details and <u>note your CID down</u>.</h5>
            <h5 style={{marginBottom:"1vw",color:'black',textAlign:'center'}}>2.Make sure that you have uploaded the <u>correct paperwork file</u>.</h5>
            <h5 style={{fontWeight:"700", paddingTop:"1vh", textDecoration:"underline",color:'black',textAlign:'center'}}>Acknowledgment</h5>
            <div style={{display:"flex", flexDirection:"row", alignSelf:"center", marginTop:"3vh" }}>
            <input style={{marginTop:"4vh",marginLeft:"10vw",marginRight: "2vw", transform: "scale(2.5)", height: "20px", width: "20px"}}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span style={{ textAlign:"left", marginRight:"7vw" }}>
        <h5 style={{color:'black',textAlign:'left'}}>I hereby verify that all the information provided by me above is true, correct, and accurate to the best of my knowledge and belief. I understand that any misrepresentation or falsification may have serious consequences and undermine the trust placed in me.</h5>
        </span>
       
        
            </div>     
 
            <h5 style={{marginBottom:"1vw", marginTop:"1vw"}}>3.When you're done, click on the button below to <b>submit your application for review</b>.</h5> 
            <button disabled={!(isChecked)} style={{alignSelf:"center", backgroundColor:"#14C38E", padding:"2vh",fontWeight:"700",marginTop:'-7vh',color:'#FEFEFA',cursor: !(isChecked) ? "not-allowed" : "pointer",}} onClick={async () => {
  await handleNameUpdate();
  await createPassengerRequest();
  setShowRegistrationCompletionModal(true);
}}>Complete & Submit Application</button>

<Modal show={showRegistrationCompletionModal} onHide={handleRegistrationModal} size="lg" centered>
<Modal.Header>
  <h4 style={{fontWeight:"700", color:'black'}}>Alert: Registration Successful!</h4>
  </Modal.Header>

        <Modal.Body style={{textAlign:"center"}}>
          <div style={{alignSelf:"center", textAlign:"center"}}>
          <h5 style={{alignSelf:"center", fontWeight:"700",color:"black"}}>Hey there!</h5>
          </div>
          <p>Your request to access our platform has been successfully created.</p>       
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleRegistrationModal} style={{backgroundColor:"#14C38E",padding:'1vh',color:'#FEFEFA',fontWeight:'700',borderRadius:"10px"}}>
            Close
          </button>
        </Modal.Footer>
      </Modal>


            
                    
                  
            </div>

                
    
                      
            </Carousel.Item>
    </Carousel>





           
               
           
      
        </div>
    )
}

export default AdministratorDashboardUserRegistration;