import React, {useState} from "react";
import SearchBox from "./Searchbox";
import Maps from "./Map";
import GraphAPI from "./GraphHopperAPI";

function App() {
  
  return (
    <>
    <div className="TheRealAPI">
      <GraphAPI/>
    </div> 
    </>
  );
}

export default App;
