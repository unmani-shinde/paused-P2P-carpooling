import React from "react";
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from "react-icons/fa";
import { RiCaravanFill } from 'react-icons/ri'
const Navbar = () =>{
    return(
        <>
        <div className="MyNavbar">
        <h3>COMMUTE.IO</h3>    
        <a href="/currentride" className=" CurrentRide"><FaCar />Current Ride</a>
        <a href="/ridehistory"className="History"><FaHistory />History</a>
        <a href="/inbox"className="Inbox"><FaEnvelope />Inbox</a>
        <a href="/checkrides"className="CheckRides"><FaCar />Check Rides</a>
        <a href="/" className="profile"><FaUser />Profile</a>
        <a href="/startaride" className="StartRide"><RiCaravanFill />Start A Ride</a>

        </div>
        </>
    )
}

export default Navbar;