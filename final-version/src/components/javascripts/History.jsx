import React from "react";
import { useState,useEffect } from "react";

const History= ()=>{
    return(
        <>
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
        </>
    )}

export default History;