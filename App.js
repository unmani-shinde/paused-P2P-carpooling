import React, {useState} from "react";
import SearchBox from "./Searchbox";
import Maps from "./Map";

function App() {
  const [selectPosition, setSelectPosition] = useState(null);
 

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: "100vw", height:"100vh"}}>
      <div style={{width:"50vw", height:"100%"}}>
        <Maps selectPosition={selectPosition}/>
      </div>
     <div style={{border: "2px solid red",width:"50vw", height:"100%"}}>
        <SearchBox selectPosition={setSelectPosition}  setSelectPosition ={setSelectPosition}/>
     </div>
    </div>
  );
}

export default App;
