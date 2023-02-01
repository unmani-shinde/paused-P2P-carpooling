import React,{ useState,useEffect} from 'react';
import './home.css'
import axios from 'axios';


const Home =()=>{
    const [UserLocation,SetUserLocation]=useState({
        Source:"",Destination:""
    });

    let name,value;

    const handleInputs=(e)=>{
        name=e.target.name;
        value=e.target.value;

        SetUserLocation({...UserLocation,[name]:value})
    }


    // const [latitude,setLatitude]=useState("");
    // const [longitude,setLongitude]=useState("");

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
        //     console.log(position.coords)
        //     setLatitude(position.coords.Latitude);
        //     setLongitude(position.coords.Longitude);
        })
        const RAPIDAPI_KEY='e7d7614529mshf3b0e6977befcc6p13700fjsn7c359e421cda'

        const GEOLOCATION_URL='https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=41.8755616&lon=-87.6244212&accept-language=en&polygon_threshold=0.0'

        const GEOLOCATION_HOST='forward-reverse-geocoding.p.rapidapi.com'

        const TAXIFARE_URL="https://taxi-fare-calculator.p.rapidapi.com/search-geo"

        const TAXIFARE_HOST="taxi-fare-calculator.p.rapidapi.com"



       const getData= async(url,host)=>{
        const response= await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': host,
            },
            
            
            

        });

        if(!response.ok){
            throw new Error(`HTTP error! status:${response.status}`);
        }
        console.log(typeof response)
        console.log(response)
        
        JSON.parse(response.data)
        return await response.json();

       };

       const runApiQueries=async()=>{
        //GET COORDINATES USING NAME OF PLACE
        const geoData=await getData(GEOLOCATION_URL,GEOLOCATION_HOST)
        console.log(geoData);
        //GET THE TAXIFARE BASED ON DISTANCE
        const FareData= await getData(
            TAXIFARE_URL + geoData.journey.fare,
            TAXIFARE_HOST

        );
        console.log(FareData);

       }

       runApiQueries();




  },[])


    return(
        <section className='home'>
            <div className='secContainer container'>
                <div className='homeText'>
                    <h1 className='title'>
                        Book Your First Ride Now!
                    </h1>

                    <p className='subTitle'>
                        Travelling Made Easy
                    </p>

                    <button className='btn'>
                        <a href="#">Explore Now</a>
                    </button>


                </div>

                <div className='homeCard grid'>
                    <div className="locationDiv">
                        <label htmlFor='location'>Source</label>
                        <input type="text" name='Source' value={UserLocation.Source}
                        onChange={handleInputs}
                         placeholder='Your Current Location'/>
                    </div>

                    <div className="locationDiv">
                        <label htmlFor='distance'>Destination</label>
                        <input type="text" name='Destination' value={UserLocation.Destination} 
                        onChange={handleInputs} placeholder='Your Destination'/>
                    </div>

                    <div className="locationDiv">
                        <label htmlFor='price'>Charges</label>
                        <input type="text" placeholder='$3/Meters'/>
                    </div>
                    <btn className='btn'>
                        Search

                    </btn>


                </div>



            </div>



        </section>
        
    )
}


export default Home;