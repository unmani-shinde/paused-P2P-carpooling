import React from "react";
import { useState,useEffect } from "react";

const CurrentRides= ()=>{
    return(
    <>
    <div className="outercover">
    <div className="PeersOnRide">
        <div className="MainRider">
            <div style={{fontSize:"30px",fontWeight:"bold",paddingBottom:"10px"}}>Aishwarya's Ride</div>
            <div>Ride ID:</div>
            <div>Source:</div>
            <div>Destination:</div>
        </div>
        <div className="OtherPeopleRide">
            <div style={{fontSize:"30px",fontWeight:"bold",paddingBottom:"10px"}}>Peers On this Ride:</div>
            <div>Unmani Shinde- PassID:</div>
            <div>Soham Lad- PassID:</div>
        </div>
        <div className="HOSTID">
            <btn className="Hostbtn">Host: Aishwarya(PassID)</btn>
        </div>

    </div>

    <div className="TrackCarpool">
        <div style={{fontSize:"30px",fontWeight:"bold",paddingLeft:"10px",paddingTop:"10px"}}>Track Your Carpool</div>
    </div>

    <div className="AbsoluteRight">
        <div className="RideUpdate">
            <h1 style={{color:"black"}}>Ride Updates</h1>
            <div style={{paddingTop:"20px"}}>
            <p>Unmani joined the pool at Andheri.</p><br/>
            <p>Soham joined the pool at Vasai.</p>
            </div>
            
        </div>
        <div className="TravelTime">
            <div style={{fontSize:"30px",fontWeight:"bold",paddingLeft:"10px"}}>Total Journey Time</div>
            <div style={{paddingLeft:"60px",paddingTop:"10px",fontSize:"20px"}}>6 hours 3 minutes</div>
        </div>
        <div className="EstimatedArrival">
            <div style={{fontSize:"30px",fontWeight:"bold",paddingLeft:"20px"}}>Estimated Arrival</div>
            <div style={{paddingLeft:"60px",paddingTop:"10px",fontSize:"20px"}}>2 hours 13 minutes</div>
        </div>
        <div className="MarkJoinDrop">
            <div className="JoinDrop" style={{ marginTop: '30px',marginLeft:"30px" }}>
                <btn className="Hostbtn">Mark my Joining/Drop-off</btn>
            </div>
        </div>
    </div>
    </div>
    
    

    
    </>
    )}

export default CurrentRides;