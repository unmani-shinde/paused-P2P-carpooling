import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import History from './History';
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';

function RideHistory() {
  const { passengerID } = useParams();

  return (
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
    <div className="RideHistory">
            <div className="Rideshosted" >
                <h1 style={{color:"black",marginLeft:"180px"}}>Rides Hosted</h1>
                <div className="R1">
                    <btn className="ridebtn">View Details</btn>
                </div>
                <div className="R1">
                    <btn className="ridebtn">View Details</btn>
                </div>
                <div className="R1">
                    <btn className="ridebtn">View Details</btn>
                </div>
                <div className="R1">
                    <btn className="ridebtn">View Details</btn>
                </div>
            </div>

            <div className="Ridestaken">
            <h1 style={{color:"black",marginLeft:"180px"}}>Rides Taken</h1>
                <div className="R1">
                    <btn className="ridebtn">View Details</btn>
                </div>
                <div className="R1">
                    <btn className="ridebtn">View Details</btn>
                </div>
                
            </div>
        </div>
    </div>
  );
}

export default RideHistory;
