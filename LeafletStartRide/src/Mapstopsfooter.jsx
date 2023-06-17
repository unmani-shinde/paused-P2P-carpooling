import React from 'react';
import { LatLng } from 'leaflet';
import {LeafletGeocoder} from "./LeafletGeocoder"

function Mapstopsfooter() {
  return (
    <>
    <div className='UpperBlock' style={{display:"flex",marginLeft:"360px",marginTop:"25px",gap:"25px"}}>
    <div className='From'>
        <input id="MySource"type='text' placeholder='Source'/>
    </div>
    <div className='To'>
        <input id="MySource" type="text" placeholder='Destination'/>

    </div>
    <button className='searchridebtn' onClick={()=>{
        //Display kardo Available Routes from contract
        
    }}>Search</button>
    </div>

    <div className='AvailableRides'>
        <p style={{marginTop:"-2vh",paddingBottom:"10px",marginLeft:"550px",backgroundColor:'white'}}>Available Rides in Your Locality</p>
                <div className="R1">
                    <btn className="avaridebtn">Book Ride</btn>
                </div>
                <div className="R1">
                    <btn className="avaridebtn">Book Ride</btn>
                </div>
                <div className="R1">
                    <btn className="avaridebtn">Book Ride</btn>
                </div>
                <div className="R1">
                    <btn className="avaridebtn">Book Ride</btn>
                </div>
                <div className='emptyspace' style={{marginTop:"60px"}}></div>
                </div>
    </>
  )
}

export default Mapstopsfooter