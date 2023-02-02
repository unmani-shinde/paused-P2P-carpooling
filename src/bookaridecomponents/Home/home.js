import React,{ useState,useEffect} from 'react';
import './home.css'
import axios from 'axios';

// import Web3 from 'web3';
 
// const Carpooling = require('../../assets/Carpooling.json'); // Contract ABI
// const web3 = new Web3(window.ethereum);
// const contract = new Web3.eth.Contract(Carpooling.abi, Carpooling.address);

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

    const [latitude,setLatitude]=useState("");
    const [longitude,setLongitude]=useState("");

    const [response, setResponse] = useState('');
    ;

    // const [origin, setOrigin] = useState('');
    // const [destination, setDestination] = useState('');
    // const [rideId, setRideId] = useState(0);
    
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position.coords)
            setLatitude(position.coords.Latitude);
            setLongitude(position.coords.Longitude);
        })
  },[])

//   const bookRide = async () => {
//     const accounts = await web3.eth.getAccounts();
//     contract.methods.bookRide(rideId).send({ from: accounts[0] });
//   };

const API=async()=>{

    const options = {
        method: 'GET',
        url: 'https://taxi-fare-calculator.p.rapidapi.com/search-geo',
        params: {dep_lat: '19.1176', dep_lng: '72.9060', arr_lat: '19.1193', arr_lng: '72.9116'},
        headers: {
            'X-RapidAPI-Key': 'e7d7614529mshf3b0e6977befcc6p13700fjsn7c359e421cda',
            'X-RapidAPI-Host': 'taxi-fare-calculator.p.rapidapi.com',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*'
        }
        };
    
        axios.request(options).then(function (response) {
            console.log(response.data);
            console.log(typeof response.data.journey)
            let finalfare=response.data.journey.fares[0].price_in_cents
            console.log(finalfare)
            setResponse(response.data.journey.fares[0].price_in_cents);
    
        }).catch(function (error) {
            console.error(error);
        });
}



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
                        <label htmlFor='price'>Charges(in Rs.)</label>
                        <input type="text" placeholder={response}/>
                    </div>
                    <btn className='btn' onClick={API}>
                        Search

                    </btn>
                    <btn className='btn'>
                        BookNow!
                    </btn>
                    


                </div>
                



            </div>



        </section>
        
    )
}


export default Home;