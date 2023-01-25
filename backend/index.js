
const ConnectToMongo=require("./db")
ConnectToMongo();
const express=require('express');

const middleware= (req,res,next)=>{
    console.log("This is my middleware");
    next();
}

const app= express()



app.use(express.json())

const port=4000
app.use(require('./routes/auth'))


app.listen(port,()=>{
    console.log(`Example App listening at http://localhost:${port}`)
})

