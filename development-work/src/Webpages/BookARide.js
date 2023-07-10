import React,{useState,useEffect} from 'react';
import './BookARide.css';
import Navbar from '../bookaridecomponents/NavBar/Navbar'
import About from '../bookaridecomponents/About/about'
import Home from '../bookaridecomponents/Home/home'
import Popular from '../bookaridecomponents/Popular/Popular'
import Publish from '../bookaridecomponents/Publish/publish'
import axios from 'axios';



function BookARide() {
  return (
    <>
    <Navbar/>
    <Home/>
    <Popular/>
    <Publish/>
    <About/>
    </>
  );
}

export default BookARide;
