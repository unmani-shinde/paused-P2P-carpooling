import mongoose from 'mongoose'

const ChatSchema = mongoose.Schema({
    members:{
        type: Array,
    }
},
{
    timestamps: true,
}

);

const ChatModel =mongoose.model("Chat",ChatSchema);
export default ChatModel;