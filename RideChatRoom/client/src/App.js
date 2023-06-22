
import './App.css';
import io from "socket.io-client"
import {useState} from "react";
import Chat from './Chat';

const socket = io.connect("http://localhost:4000");

function App() {

  const [username,setUsername]=useState("")
  const [room,setRoom]=useState("")
  const [showChat,setShowChat]=useState(false)

  const joinRoom = () => {
    if (username!=="" && room !==""){
      socket.emit("join_room", room);
      setShowChat(true);

    }

  }


  return (
    <div className="ChatApp">
      {!showChat ? (
      <div className='joinChatContainer'>
       <h1>Join a chat</h1>
       <input type="text" placeholder="Username" 
       onChange={(e)=>{setUsername(e.target.value)}}/>

       <input type="text" placeholder="RideID" 
       onChange={(e)=>{setRoom(e.target.value)}}/>
       <button className="Joinbutton" onClick={joinRoom}>Enter Ride Inbox</button>
    </div>
      )
    : (
       <Chat socket={socket} username={username} room={room}/>
    )}
    </div>
  );
}

export default App;
