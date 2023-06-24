import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';
import CommuteIOABI from "../ABI/contracttestingABI.json";
import Leaf from "../images/leaf.png"

const contractAddress = '0x303b3f8D8b2832A2044cb404Efe326d300BF590C';

function LoginPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
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

  const handleLogin = async (event) => {
    event.preventDefault();
    const passengerID = event.target.passengerID.value;
    const obj = await contract.methods.GetPassDetails(passengerID).call();
    const passDetails = Object.values(obj);
    if((passengerID==passDetails[0])&&(passDetails[2]==accounts[0])){
      try {
        setLoading(true);
        const message = 'Login authentication: ' + Date.now();
        const signature = await web3.eth.personal.sign(message, accounts[0]);
        history.push(`/startaride/${passengerID}`);
        history.push(`/bookaride/${passengerID}`);
        history.push(`/viewallrides/${passengerID}`);
        history.push(`/ridehistory/${passengerID}`);
        history.push(`/myinprogressrides/${passengerID}`);
        history.push(`/dashboard/${passengerID}`);
      } catch (error) {
        // Handle error
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    else{
      console.log(accounts[0],passDetails[2]);
    }
   
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          padding: '70px',
          border: '1px solid #000',
          borderRadius: '4px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px',marginTop:"-1vh",color:'black',textDecoration:'none',fontWeight:"700" }}>Login</h2>
        <form onSubmit={handleLogin} style={{ textAlign: 'center' }}>
          <input
            type="number"
            name="passengerID"
            placeholder="Enter your Passenger ID"
            style={{ padding: '10px', marginBottom: '10px',width:'20vw',textAlign:'center' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px',
              height:'6.5vh',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default LoginPage;
