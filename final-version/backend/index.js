const Message= require("./Schema/MessageModel")
const db = require("./db")

const ConnectToMongo=require("./db")
ConnectToMongo();

const express = require('express')

const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require("socket.io");



const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'], 
};

app.use(express.json());


app.use(cors(corsOptions));

const server = http.createServer(app);



app.post('/messages', async (req, res) => {
  try {
    const { room,author, message, time } = req.body;

    
    const newMessage = new Message({
      room,
      author,
      message,
      time,
    });

    
    await newMessage.save();

    
    io.to(room).emit('receive_message', newMessage);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});

// retrieve chat 
app.get('/messages/:room', async (req, res) => {
  try {
    const { room } = req.params;
    const history = await Message.find({room});

    res.status(200).json(history);
  } catch (error) {
    console.error('Error retrieving chat history:', error);
    res.status(500).json({ error: 'Failed to retrieve chat history' });
  }
});

const io= new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods:["GET","POST"],
    }
})

const userList = {};

io.on("connection",(socket)=>{
    console.log(`User Connected:${socket.id}`)

    socket.on("join_room", (data)=>{
        socket.join(data.room);
        socket.username = data.username;
        userList[data.room] = userList[data.room] || [];
        userList[data.room].push(data.username);
        console.log(`User with ID:${socket.id} joined room ${data}`)

        socket.to(data.room).emit('user_entered', data.username);
        io.to(data.room).emit("users_in_room", userList[data.room])
    })

    

    const receiveMessageHandler = async (data) => {
        const message= new Message(data);
        await message.save();
        
        await new Promise((resolve)=>{
          socket.to(data.room).emit("receive_message",data,resolve) ;
        })
             

    };

    socket.on("receive_message", receiveMessageHandler)
    



    socket.on("disconnect", ()=>{
        console.log("User Disconnected",socket.id);

        Object.keys(userList).forEach((room) => {
          const index = userList[room].indexOf(socket.username);
          if (index !== -1) {
            userList[room].splice(index, 1);
            io.to(room).emit('users_in_room', userList[room]);
          }
        })
    })
})

server.listen(4000, ()=>{
    console.log("Server Running")
})