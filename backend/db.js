const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const mongoURI="mongodb://127.0.0.1:27017/ChatSystem"


const ConnectToMongo= ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected To MongoDB successfully");
        setupTTLIndex();
    })
}

const setupTTLIndex = () => {
    const collectionName = "messages"; 
    const ttlField = "createdAt"; // Replace with the field representing the creation time of documents
    const ttlInSeconds = 60 * 60; 
  
    const collection = mongoose.connection.collection(collectionName);
    collection.createIndex({ [ttlField]: 1 }, { expireAfterSeconds: ttlInSeconds })
      .then(() => {
        console.log(`TTL index created on collection "${collectionName}" for field "${ttlField}"`);
      })
      .catch((error) => {
        console.error("Error creating TTL index:", error);
      });
  };

module.exports=ConnectToMongo;