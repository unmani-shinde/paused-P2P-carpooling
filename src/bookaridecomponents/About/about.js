import React from 'react';
import './about.css';
import video from "../../assets/Images/video.mp4"

const About =()=>{
    return(
        <section className='about section'>
            <div className='secContainer'>
                <div className='videocard container'>
                    <div className='cardContent grid'>
                        <div className='cardText'>
                            <h2> A Wonderful Journey Awaits You!</h2>
                            <p>An exquisite ride sharing experience ready to sweep you off your feet. </p>
                            <h4>Convenient,Economical,Secure!</h4> 
                            
                        </div>

                        <div className='cardVideo'>
                            <video src={video} autoPlay loop muted type="video/mp4"></video>
                        </div>

                    </div>
                </div>
            </div>




        </section>
        
    )
}

export default About;