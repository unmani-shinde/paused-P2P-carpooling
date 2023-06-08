import React, { useState } from 'react';
import "../stylesheets/HomePage.css";
import { motion } from "framer-motion"
import Car from "../../assets/homepage-car.png";
import { duration } from '@mui/material';

const Vehicle = () => {
  return <motion.div className="car" src={Car}></motion.div>;
};

function HomePage() {

  
  return (
    <motion.div
      className="container"
      animate={{ rotateY: 180, translateZ: "-300px" }}
      transition={{ duration: 2 }}
    >
      <Vehicle />
    </motion.div>
  );
}

export default HomePage;
