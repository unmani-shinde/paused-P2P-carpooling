import React,{ useState,useEffect} from 'react';
import axios from 'axios';

const API=()=>{
    

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
    }).catch(function (error) {
        console.error(error);
    });

    



}

export default API;

