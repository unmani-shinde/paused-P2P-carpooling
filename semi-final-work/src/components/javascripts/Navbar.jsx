import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FaUser, FaListAlt, FaCar, FaHistory, FaEnvelope } from 'react-icons/fa';
import { RiCaravanFill } from 'react-icons/ri';

const Navbar = () => {
  const match = useRouteMatch('/dashboard/:passengerID');
  const { passengerID } = match?.params || {};

  return (
    <div className="MyNavbar">
      <h3>COMMUTE.IO</h3>
      <Link to={`/dashboard/${passengerID}`} className="profile">
        <FaUser />Profile
      </Link>
      <Link to={`/currentride/${passengerID}`} className="CurrentRide">
        <FaCar />Current Ride
      </Link>
      <Link to={`/ridehistory/${passengerID}`} className="History">
        <FaHistory />History
      </Link>
      <Link to={`/enterRideInbox/${passengerID}`} className="Inbox">
        <FaEnvelope />Inbox
      </Link>
      <Link to="/checkrides" className="CheckRides">
        <FaCar />Check Rides
      </Link>
      <Link to="/startaride" className="StartRide">
        <RiCaravanFill />Start A Ride
      </Link>
    </div>
  );
};

export default Navbar;
