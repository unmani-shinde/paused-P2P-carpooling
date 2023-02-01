import React,{useState,useEffect} from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar'
import About from './components/About/about'
import Home from './components/Home/home'
import Popular from './components/Popular/Popular'
import Publish from './components/Publish/publish'



function App() {
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

export default App;
