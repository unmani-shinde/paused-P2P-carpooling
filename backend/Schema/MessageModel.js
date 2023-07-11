
const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
    room:{
        type: String
    },
    author:{
        type:String
    },
    message:{
        type:String
    },
    time :{
        type: String
    }
},
{
    timestamps: true
}
    
);

const Message = mongoose.model("Message",MessageSchema)

module.exports = Message;