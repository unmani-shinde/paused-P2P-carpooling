import React from 'react';
import './publish.css'
import sideImg from "../../assets/Images/book cab.jpg"

const Publish =()=>{
    return(
        <section className='publish'>
            <div className='secContainer container'>
                <div className='publishText'>
                    <h2>Planning to Publish Your Own Ride?</h2>
                    <h4> You won't find a better place than this,Hop In!</h4>
                    <div className='sideImage'>
                        <img src={sideImg}alt='taxi car'/>
                    </div>
                    
                </div>
                <div className='publishBtn'>
                    <button className='btn'>Offer Ride</button>
                </div>
                <div className='publishCard grid'>
                    <div className="locationDiv">
                        <label htmlFor='location'>Source</label>
                        <input type="text" placeholder='Your Current Location'/>
                    </div>

                    <div className="locationDiv">
                        <label htmlFor='distance'>Destination</label>
                        <input type="text" placeholder='Your Destination'/>
                    </div>

                    <div className="locationDiv">
                        <label htmlFor='price'>Charges</label>
                        <input type="text" placeholder='$3/Meters'/>
                    </div>
                    <btn className='btn'>
                        Publish

                    </btn>
                </div>

            </div>




        </section>

        )
    }

export default Publish;