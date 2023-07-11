import React from "react";
import { useState,useEffect } from "react";
import { FaStar } from 'react-icons/fa';

const TopSection= ()=>{
    return(
        <>
        <div className="heading">Welcome aboard,User!</div>
        <div className="AllinAll">
        <div className="profilesec">
            <div className="profilephotu">
            <img src="" alt="Profile img"></img>
            </div>
            <div className="UserDetails">
                <div style={{fontSize:"30px",fontWeight:"bold",paddingBottom:"30px"}}>Username</div>
                <div>Email-ID:</div>
                <div>Community Review:5/5<FaStar/></div>
                <div>Date Joined:</div>
                <div>Rides Hosted:</div>
                <div>Rides Taken:</div>   
            </div>
        
            
            
            </div>    

            <div className="walletwagera">
            <div>Location:</div>
            <div>Metamask Wallet address:</div>
            <div>Registered Vehicle:</div>
            
            <div className="RewardReferral">
            <div>COMMUTE.IO Passenger ID:</div>
            <div>Reward Points:</div>
            <div>Referral Link:</div>
            </div>

        </div>
        </div>
        <div className="importantbaat">
                <div className="greenbox">Aise hi panchayat</div>
            </div>
        
        
        
        </>
    )
}

export default TopSection;