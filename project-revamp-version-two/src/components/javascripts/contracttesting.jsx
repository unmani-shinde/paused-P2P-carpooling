import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import CommuteIOABI from '../ABI/contracttestingABI.json';
import "../stylesheets/contracttesting.css";

const contractAddress = '0x6f9360Fc1Ca4833818FEc262FCb3eF204F8357CD';

function Passenger() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [passengerRequests, setPassengerRequests] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [email, setEMail] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleDetailsHash, setVehicleDetailsHash] = useState("");
  const [gender, setGender] = useState("");



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


  const ToggleFormVisibility = async() =>{
    setShowForm(!showForm);
  }

  const createPassengerRequest = async () => {
    try {
       
      // Call the contract function to create the passenger request
      await contract.methods
        .CreatePassengerRequest(name, homeAddress, vehicleDetailsHash, gender, email, vehicleName, vehicleNumber)
        .send({ from: accounts[0] });
  
      // Reload the passenger requests
      await loadPassengerRequests(contract);
  
      // Reset the form and hide it
      setName("");
      setHomeAddress("");
      setVehicleDetailsHash("");
      setGender("");
  
      alert("Passenger Request Created.");
    } catch (error) {
      console.error('Error creating passenger request:', error);
      alert('An error occurred while creating the passenger request. Please try again.');
    }
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
        PassEMail: passengerDetails[7],
        PassVehicleName: passengerDetails[8],
        PassVehicleNumber: passengerDetails[9],
        PassVehicleDetailsHash: passengerDetails[4],
        PassGender: passengerDetails[5],
        PassReview: passengerDetails[6],
        PassRidesHosted: passengerDetails[7],
        PassRidesTaken: passengerDetails[8],
      });
    }

    setPassengers(passengersList);
  };

  const approvePassengerRequest = async (passreqid) => {
    await contract.methods.ApprovePassengerRequest(passreqid).send({ from: accounts[0] });
    await loadPassengerRequests(contract);
    await loadPassengers(contract);
    alert("Passenger Request Approved.");
    loadPassengers(contract);
  };

  const rejectPassengerRequest = async (passreqid) => {
    await contract.methods.RejectPassengerRequest(passreqid).send({ from: accounts[0] });
    await loadPassengerRequests(contract);
    alert("Passenger Request Rejected.")
    loadPassengers(contract);
  };

  const handleViewDetails = (passengerID) => {
    const selectedPassenger = passengers.find((passenger) => passenger.PassID == passengerID);
    setSelectedRequest(selectedPassenger);
  };

  return (
    <div>
      <h2>Passenger Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Name</th>
            <th>Wallet Address</th>
            <th>Home Address</th>
            <th>EMail</th>
            <th>Vehicle Name and Type</th>
            <th>Vehicle Number</th>
            <th>Vehicle Details Hash</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {passengerRequests.map((request) => (
            <tr key={request.PassRequestID}>
              <td>{request.PassRequestID}</td>
              <td>{request.PassName}</td>
              <td>{request.PassWalletAddress}</td>
              <td>{request.PassHomeAddress}</td>
              <td>{request.PassEMail}</td>
              <td>{request.PassVehicleName}</td>
              <td>{request.PassVehicleNumber}</td>        
              <td>{request.PassVehicleDetailsHash}</td>
              <td>{request.PassGender}</td>
              <td>{request.PassRequestStatus == 0 ? "Pending" : (request.PassRequestStatus == 1 ? "Approved" : "Rejected")}</td>
              <td>
                {request.PassRequestStatus == 0 && (
                  <div>
                    <button onClick={() => approvePassengerRequest(request.PassRequestID)}>Approve</button>
                    <button onClick={() => rejectPassengerRequest(request.PassRequestID)}>Reject</button>

                  </div>
                    
                  
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={ToggleFormVisibility}>{showForm ? "Done" : "Create Passenger Request"}</button>

      {showForm && (
        <div>
          <h2>Create Passenger Request</h2>
          
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <br />
            <label>Home Address:</label>
            <input type="text" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required />
            <br />
            <label>EMail:</label>
            <input type="text" value={email} onChange={(e) => setEMail(e.target.value)} required />
            <br />
            <label>Vehicle Name and Type:</label>
            <input type="text" value={vehicleName} onChange={(e) => setVehicleName(e.target.value)} required />
            <br />
            <label>Vehicle Number:</label>
            <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required />
            <br />
            <label>Vehicle Details Hash:</label>
            <input type="text" value={vehicleDetailsHash} onChange={(e) => setVehicleDetailsHash(e.target.value)} required />
            <br />
            <label>Gender:</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
            <br />
            <button type="submit" onClick={createPassengerRequest}>Submit</button>

        </div>
      )}

      <h2>Passengers</h2>
    <table className="passenger-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Wallet Address</th>
          <th>Home Address</th>
          <th>Vehicle Details Hash</th>
          <th>Gender</th>
          <th>Review</th>
          <th>Rides Hosted</th>
          <th>Rides Taken</th>
        </tr>
      </thead>
      <tbody>
        {passengers.map((p) => (
          <tr key={p.PassID}>
            <td>{p.PassID}</td>
            <td>{p.PassName}</td>
            <td>{p.PassWalletAddress}</td>
            <td>{p.PassHomeAddress}</td>
            <td>{p.PassVehicleDetailsHash}</td>
            <td>{p.PassGender}</td>
            <td>{p.PassReview}</td>
            <td>{p.PassRidesHosted}</td>
            <td>{p.PassRidesTaken}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Passenger;
