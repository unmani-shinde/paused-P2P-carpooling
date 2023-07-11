import React, { useState, useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Web3Storage } from 'web3.storage';
import '../stylesheets/UserDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import CommuteIOABI from "../ABI/contracttestingABI.json";
import Modal from 'react-bootstrap/Modal';
import Navbar from '../javascripts/Navbar';
import TopSection from '../javascripts/TopSection';
import { FaStar } from 'react-icons/fa';
import { FaUser, FaRegWindowClose,FaListAlt, FaCar, FaHistory, FaEnvelope,FaRegCheckSquare} from 'react-icons/fa';
import {LuRotateCw,LuRotateCcw} from "react-icons/lu";
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';

import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';



const contractAddress = '0x9D66687E6Da2BC0A5444125A8fA389C3e96F1921';

function DashboardPage() {
  const  {passengerID}  = useParams();

  const [web3, setWeb3] = useState(null);
const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [passengerRequests, setPassengerRequests] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [registrationDate, setRegistrationDate] = useState('');
    const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [showPFPModal, setShowPFPModal] = useState(false);
  const [showUpdatebutton, setShowUpdatebutton] = useState(true);
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [CID,setCID] = useState('');
  const [buttonAvailable,setButtonAvailable] = useState(false);
  const windowHeight = window.innerHeight;
const avatarSize = windowHeight * 0.3; // 30% of the viewport height
const previousDays = [0,1,2,3,4,5,6];
const [previousRides, setPreviousRides] = useState([]);
const [selectedDiv, setSelectedDiv] = useState(null);
const [showToast, setShowToast] = useState(false);
const [prevDates,setPrevDates] = useState([]);

const handleClick = (index) => {
  setSelectedDiv(index);
  setShowToast(true);
};

const handleCloseToast = () => {
  setShowToast(false);
};
  
function formatDate(date) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month} ${day}, ${year}`;
}


// ..
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setShowPFPModal(true);
  };

  const handleCrop = async () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas().toDataURL();
      //console.log(canvas);
      // Do something with the cropped image canvas
      setShowPFPModal(false);
      await storeFiles(canvas);
    }
  };
  const fileInputRef = useRef(null);
 
  const getFiles = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      return fileInputRef.current.files;
    }
    return null;
  }

  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc4OTc1NDg1NzIsIm5hbWUiOiJjb21tdXRlLWlvLXBmcC1zdG9yYWdlIn0.ocUIDWupDo_fnouuAGN2rPvsA2uhd-BG_eHvWal55Ps";
  }
  
  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  const dataURLToBlob = async (dataURL) => {
    const response = await fetch(dataURL);
    const blob = await response.blob();
  
    // Extract file type from data URL
    const fileType = dataURL.split(',')[0].split(':')[1].split(';')[0].split('/')[1];
    // Generate a unique file name using a timestamp
    const fileName = `image.${fileType}`;
    return new File([blob], fileName, { type: blob.type });
  };
  
 
  const storeFiles = async (canvas) => {
    const blob = await dataURLToBlob(canvas);
    const files = [blob];
    
    const client = makeStorageClient();

    if (files==null) {
      console.error('No files selected.');
      return;
    }

    try {
        const cid = await client.put(files);
        alert("File upload successful.");
        console.log('stored files with cid:',cid);

        setButtonAvailable(true);
        setCID(cid);
        try{
          await contract.methods.setProfilePicture(passengerID, cid).send({
            from: accounts[0]
          });
        }
        catch(error){
          console.log("Metamask execution error: ",error);
        }
       
        alert("Function called.");
        
      
    } catch (error) {
      alert("There was an upload problem.")
      console.log(error);
    }
  };

  const retrieve = async () => {
    const client = makeStorageClient();

    try {
      if(!(CID=="")){
        const res = await client.get(CID);

        if (!res.ok) {
          throw new Error(`Failed to get ${CID}`);
        }
        const baseWeb3StorageUrl = 'https://ipfs.io/ipfs/';
        const file = '/image.png';
        const fileName = `${baseWeb3StorageUrl}${CID}${file}`;
        setImageSrc(fileName);
    
      } 
     
    } catch (error) {
      console.error('Error retrieving image:', error);
    }
  };

  useEffect(() => {
    if (fileInputRef.current && fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      setImage(URL.createObjectURL(file));
    }
    retrieve();
  }, []);

  const handleScaleChange = (event) => {
    const scaleValue = parseFloat(event.target.value);
    setScale(scaleValue);
  };

  const handleRotate = (direction) => {
    setRotate((prevRotate) => (direction === 'left' ? prevRotate - 90 : prevRotate + 90));
  };
     // Added loading state
  
     useEffect(() => {
      const retrieveImage = async () => {
        await retrieve();
      };    
        retrieveImage();
  
    }, [CID]);
  
  

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
          // await fetchPastRides();
          setIsLoading(false);

          const requestDetails = await contract.methods.GetPassRequestDetails(parseInt(passengerID)).call();
          setUserDetails(requestDetails);

          const dt = await contract.methods.GetPassDateJoined(passengerID).call();
          const parsedDate = new Date(dt);

          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          const month = monthNames[parsedDate.getMonth()];
          const day = parsedDate.getDate();
          const year = parsedDate.getFullYear();

          const formattedDate = `${month} ${day}, ${year}`;
          setRegistrationDate(formattedDate);

          const cid = await contract.methods.getProfilePicture(passengerID).call();
          if(!(cid=="")){
            setCID(cid);
            await retrieve();

          }

          const today = new Date(); // Current date
          let dates = [formatDate(today)];
          for (let i = 1; i <= 6; i++) {
            const previousDate = new Date(today); // Create a new date object
            previousDate.setDate(today.getDate() - i); // Subtract 'i' days from today's date
            dates.push(formatDate(previousDate)); // Add the formatted date to the array
          }

          setPrevDates(dates);

          let prevRides = [];
          
          const numRides = await contract.methods.GetnumRides().call();
          for(let i=1; i<=numRides;i++){
            const ride = await contract.methods.GetRideDetails(i).call();
            if((ride[3]==passengerID || ride[4].includes(passengerID))&&dates.includes(ride[9][0])){
              const details = [ride[9][0],ride[1],ride[2]];
              prevRides.push(details);
            }
          }
          setPreviousRides(prevRides);   


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

<div className="heading" style={{alignSelf:'center'}}><h2 style={{fontWeight:"700", fontSize:"xx-large", color:"black"}}>Welcome aboard,User!</h2></div>
    <div className="AllinAll" style={{alignSelf:"center"}}>
    <div className="profilesec" style={{display:'flex',flexDirection:"row",alignSelf:'center'}}>
      <div style={{width:"45%",height:"100%",display:'flex',flexDirection:'column'}}>
        <div style={{height:"80%",width:"100%"}}>
          <div style={{backgroundColor:"transparent",border:"2px solid black",width:'30vh',height:'30vh',borderRadius:"50%",textAlign:'center',marginTop:"1.5vh",marginLeft:"3vw"}}>
          {!(imageSrc=="") && (
            <div style={{ position: 'relative', width: '30vh', height: '30vh', borderRadius: '50%', overflow: 'hidden' }}>
            <AvatarEditor
      image={imageSrc}
      width={avatarSize}
      height={avatarSize}
      border={0}
      borderRadius={100}
      color={[255, 255, 255, 0]}
      scale={1}
      rotate={rotate}
    />
            </div>
          
          )}
          {croppedImage=="" && (<div style={{color:'white'}}>Hi Ji!</div>)}</div>
        </div>
        <div style={{height:"20%",width:"100%"}}>
        {showUpdatebutton && (
  <button
    style={{
      backgroundColor: "#116D6E",
      width: "13vw",
      padding: "1vh",
      borderRadius: "5px",
      color: "white",
      fontWeight: "700",
      marginLeft:'4vw',
      marginTop:"0vh"
    }}
    onClick={() => {
  setShowUpdatebutton(false);
 
}}

  >
    Update Image
  </button>
)}
{!showUpdatebutton && (<div>

  <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{marginLeft:"5.5vw",marginTop:"1vh",color: "transparent"}} capture="user" />

<Modal style={{marginTop:"15vh"}} show={showPFPModal} onHide={() => setShowPFPModal(false)}>
  <Modal.Header closebutton>
    <Modal.Title><h4 style={{color:"black",fontWeight:"700",fontSize:'x-large'}}>Crop Profile Picture</h4></Modal.Title>
    <button onClick={() => setShowPFPModal(false)}>
      <FaRegWindowClose style={{transform:"scale(1.5)"}}/>
    </button>
  </Modal.Header>
  <Modal.Body>
    {image && (
      <div style={{alignSelf:'center',justifyContent:'center'}}>
        <AvatarEditor style={{alignSelf:'center',marginLeft:"7vw"}}
          ref={(ref) => setEditor(ref)}
          image={image}
          width={avatarSize}
          height={avatarSize}
          border={0}
          borderRadius={100}
          color={[255, 255, 255, 0.6]} // Color of the border, RGBA
          scale={scale}
          rotate={rotate}
        />
        <div>
        <label style={{ marginTop: '1rem',fontWeight:'700',fontSize:"large" }}>
  Select Zoom:
  <input
  type="range"
  min="0.1"
  max="2"
  step="0.1"
  value={scale}
  onChange={handleScaleChange}
  style={{
    background: 'linear-gradient(-45deg, #116D6E 10%, transparent 10%, transparent 20%, #116D6E 20%, #116D6E 30%, transparent 30%, transparent 40%, #116D6E 40%, #116D6E 50%, transparent 50%, transparent 60%, #116D6E 60%, #116D6E 70%, transparent 70%, transparent 80%, #116D6E 80%, #116D6E 90%, transparent 90%, transparent)',
    backgroundSize: '200% 200%',
    //animation: 'progress-bar-stripes 2s linear infinite',
    borderRadius: '5px',
    height: '8px',
    width:"20vw",
    marginLeft: '0.5rem',
    outline: 'none',
    WebkitAppearance: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    '::-webkit-slider-thumb': {
      backgroundColor: 'purple',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    
  }}
/>


</label>
<br></br>
<div style={{alignSelf:'center',paddingLeft:"6vw",paddingTop:'1vh'}}>
<button style={{alignSelf:'center',justifyContent:'center',backgroundColor:"#116D6E",color:"#FEFEFA",padding:'1vh',marginRight:"1vw",borderRadius:"5px",fontWeight:'700',fontSize:"large"}} onClick={() => handleRotate('left')}><LuRotateCcw style={{fontWeight:'700'}}/> Rotate Left</button>
          <button style={{alignSelf:'center',justifyContent:'center',backgroundColor:"#116D6E",color:"#FEFEFA",padding:'1vh',borderRadius:"5px",fontWeight:'700',fontSize:"large"}} onClick={() => handleRotate('right')}><LuRotateCw style={{fontWeight:"700"}}/> Rotate Right</button>
</div>

          
        </div>
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    
    <button style={{fontWeight:"700",fontSize:'large',color:'white',backgroundColor:'#14C38E',padding:'1vh',borderRadius:'5px'}}onClick={handleCrop}>
      Save Changes    <FaRegCheckSquare style={{transform:'scale(1.5)',marginLeft:'0.5vw'}}/>
    </button>
  </Modal.Footer>
</Modal>


</div>)

}

        </div>

      </div>
      <div style={{width:"55%",height:"100%"}}>
      <div className="UserDetails">
            <div style={{fontSize:"30px",fontWeight:"bold",paddingBottom:"3vw"}}>{isLoading?" ":passengers[passengerID-1].PassName}</div>
            <div style={{marginTop:"-5vh",marginBottom:"0.5vw" }}><b>Email-ID:</b> <u>{isLoading?" ":passengers[passengerID-1].PassEMail}</u></div>
            <div style={{marginBottom:"0.5vw"}}><b>Community Review:</b> {isLoading?" ":passengers[passengerID-1].PassReview}<FaStar/></div>
            <div style={{ marginBottom: "0.5vw" }}>
  <b>Date Joined: </b>
  {isLoading ? " " : registrationDate === "" ? "" : registrationDate}
</div>

            <div style={{marginBottom:"0.5vw"}}><b>Rides Hosted: </b>{isLoading?" ":passengers[passengerID-1].PassRidesHosted}</div>
            <div style={{marginBottom:"0.5vw"}}><b>Rides Taken: </b>{isLoading?" ":passengers[passengerID-1].PassRidesTaken}</div>   
        </div>

      </div>
      
      {/* <div className="profilephotu" style={{alignSelf:'center',marginTop:'-8vh'}}> </div>

       
        <div className="UserDetails">
            <div style={{fontSize:"30px",fontWeight:"bold",paddingBottom:"3vw"}}>{isLoading?" ":passengers[passengerID-1].PassName}</div>
            <div style={{marginTop:"-5vh",marginBottom:"0.5vw" }}><b>Email-ID:</b> <u>{isLoading?" ":passengers[passengerID-1].PassEMail}</u></div>
            <div style={{marginBottom:"0.5vw"}}><b>Community Review:</b> {isLoading?" ":passengers[passengerID-1].PassReview}<FaStar/></div>
            <div style={{ marginBottom: "0.5vw" }}>
  <b>Date Joined: </b>
  {isLoading ? " " : registrationDate === "" ? "" : registrationDate}
</div>

            <div style={{marginBottom:"0.5vw"}}><b>Rides Hosted: </b>{isLoading?" ":passengers[passengerID-1].PassRidesHosted}</div>
            <div style={{marginBottom:"0.5vw"}}><b>Rides Taken: </b>{isLoading?" ":passengers[passengerID-1].PassRidesTaken}</div>   
        </div> */}
    
        
        
        </div>    

        <div>

        </div>
        
        <div style={{display:'flex', flexDirection:"column"}}>
        <div className="walletwagera">
        <div style={{marginTop:"1vw"}}><b>Location: </b>{isLoading?" ":passengers[passengerID-1].PassHomeAddress}</div>
        <div><b>Metamask Wallet Address: </b>{isLoading?" ":passengers[passengerID-1].PassWalletAddress}</div>
        <div><b>Registered Vehicle:</b> {isLoading?" ":passengers[passengerID-1].PassVehicleName == " " ? "N/A" : `${passengers[passengerID-1].PassVehicleName}, ${passengers[passengerID-1].PassVehicleNumber}`}</div>
        </div>
        <div className="RewardReferral">
        <div style={{marginTop:"0.75vw"}}><b>COMMUTE.IO Passenger ID: </b>{passengerID}</div>
        <div><b>Reward Points: </b>0</div>
        <div><b>Referral Link: </b>Coming Soon...</div>
        </div>
        </div>
       

    
    </div>
  <div className="importantbaat" style={{ alignSelf: "center", display: 'flex', flexDirection: 'column', marginTop: "-3vh" }}>
  <div className="greenbox" style={{ display: 'flex', flexDirection: 'column', height: '25vh' }}>
    <h4 style={{ color: 'white', fontWeight: '700', marginLeft: "1vw", marginTop: '2vh' }}>
      {isLoading ? "" : passengers[passengerID - 1].PassName.split(" ")[0]}'s Past Week:
    </h4>
    <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', paddingLeft: '12vw', paddingRight: '12vw' }}>
      {prevDates.length>0 && previousDays.map((dayIndex) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - dayIndex));
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const dateNumber = date.getDate();
        // const monthNames = [
        //   'January', 'February', 'March', 'April', 'May', 'June',
        //   'July', 'August', 'September', 'October', 'November', 'December'
        // ];
        // const month2 = monthNames[date.getMonth()];
        // const day2 = date.getDate();
        // const year = date.getFullYear();
        const currentToastDate = prevDates[6-dayIndex];
        let associatedRides =[];
        // console.log(previousRides.length);

        if(previousRides.length>0){
          for(let i=0;i<previousRides.length;i++){
            if(previousRides[i][0]==currentToastDate){
              associatedRides.push(previousRides[i])
              console.log(true);
            }
            else{
              console.log(false);
            }

          }

        }
        
        

        const handleMouseEnter = () => {
          setShowToast(dayIndex);
        };

        const handleMouseLeave = () => {
          setShowToast(null);
        };

        return (
          <div
            style={{ textAlign: 'center', backgroundColor: "#FFFFFF", color: "#1B9C85", paddingBottom: "1vh", paddingLeft: '1vh', paddingRight: '1vh', marginLeft: "0.5vw", height: "15vh", width: '7vw', borderRadius: "5px", display: 'flex', flexDirection: "column" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            key={dayIndex}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>{day}</div>
            <div style={{ fontSize: "30px", fontWeight: "bold" }}>{dateNumber}</div>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>{month}</div>

            {showToast === dayIndex && (
              <div style={{width:"60vw",marginLeft:"-4vw"}}>
                <Toast onClose={() => setShowToast(null)} style={{marginTop:"-40vh"}}>
                <Toast.Header>
                  <strong className="me-auto">Ride Details</strong>
                  <small>{day}, {month} {dateNumber}</small>
                </Toast.Header>
                <Toast.Body style={{color:'black',textAlign:"left",zIndex:'10'}}>
  {/* Add your ride details or content here */}
  <div>
    {associatedRides.length>0 && associatedRides.map((ride, index) => (
      <div key={index} style={{fontSize:"larger"}}>
        <u>Ride {index + 1}:</u><br></br>
        From:<p style={{fontWeight:"400"}}>{ride[1]}</p>
        To: <p style={{fontWeight:"400"}}>{ride[2]}</p>
        <hr></hr>        
      </div>
    ))}
    {associatedRides.length==0 && (
      <div style={{fontSize:"larger",fontWeight:"400",paddingTop:'2.5vh',paddingBottom:"2.5vh",textAlign:'center'}}>No Rides were scheduled for this day.</div>
    )
    }
  </div>
</Toast.Body>


              </Toast>
              </div>
              
            )}
          </div>
        );
      })}
    </div>
  </div>
</div>


{isLoading && (<div className="loading-spinner">
      <div className="spinner"></div>
    </div>)}

</div>
)

}
</div>
  )};

export default DashboardPage;

