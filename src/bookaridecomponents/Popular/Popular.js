import React from 'react';
import './Popular.css';
import {BsArrowLeftShort} from 'react-icons/bs'
import {BsArrowRightShort} from 'react-icons/bs'
import {BsDot} from 'react-icons/bs'

import img1 from '../../assets/Images/car1final.jpg'
import img2 from '../../assets/Images/car2.jpg'
import img3 from '../../assets/Images/car3.jpg'

const Data=[
    {
        id:1,
        imgSrc:img1,
        destTitle:"Our Fleet",
        location:"The Classic",
        grade: "$10"
    },
    {
        id:2,
        imgSrc:img2,
        destTitle:"Our Fleet",
        location:"The Prime",
        grade: "$20"
    },

    {
        id:3,
        imgSrc:img3,
        destTitle:"Our Fleet",
        location:"The Supreme",
        grade:"$25"
    }


]


const Popular =()=>{
    return(
        <section className='popular section container'>
            <div className='secContainer'>
                <div className='secHeader flex'>
                    <div className='textDiv'>
                        <h2 className='secTitle'>
                            Popular Rides
                        </h2>
                        <p>
                            We provide a wide range of rides,within the city and Outstation Rides as well.
                            Our fleet is extraordinary and the customer can choose the ride as per their convenience. 
                        </p>
                    </div>

                    <div className='iconsDiv flex'>
                        <BsArrowLeftShort className="icon leftIcon"/>
                        <BsArrowRightShort className="icon rightIcon"/>
                    </div>


                </div>

                <div className='mainContent grid'>
                    {
                        Data.map(({id,imgSrc,destTitle,location,grade})=>{
                            return(
                                <div className='singleDestination'>
                                    <div className='destImage'>
                                        <img src={imgSrc} alt="Image title "/>
                                        <div className='overlayInfo'>
                                            <h3>{destTitle}</h3>
                                            <p>
                                                {location}
                                            </p>

                                            <BsArrowRightShort className='icon'/>



                                        </div>
                            
                            


                            

                        </div>

                        <div className='destFooter'>
                            <div className='number'>
                                0{id}
                            </div>

                            <div className='destText flex'>
                                <h6>
                                    {location}
                                </h6>
                                <span className='flex'>
                                    <span className='dot'>
                                        <BsDot className='icon'/>

                                    </span>
                                    Book at:{grade}
                                    



                                </span>
                            </div>





                        </div>
                      
                    </div>
                            )
                        })
                    }



                </div>





            </div>







        </section>
        
    )
}

export default Popular;