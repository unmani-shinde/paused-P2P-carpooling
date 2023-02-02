const express = require('express');
const bcrypt=require("bcryptjs")
const User= require("../models/User")
const router= express.Router();
const jwt=require("jsonwebtoken")

const app=express();

const cors = require('cors');
app.use(cors({ origin: true }));


router.post('/signup',async (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const {Fullname,Username,email,phonenumber,password,cpassword}=req.body

    if(!Fullname|| !Username|| !email|| !phonenumber|| !password|| !cpassword){
        return res.json({error:"Please fill the details properly"})
    }

    try{
        const userExist=  await User.findOne({email:email})
        console.log(Fullname)

        if (userExist){
            return res.status(422).json({error:"Email already exists"})
        }
        const user = new User({Fullname,Username,email,phonenumber,password,cpassword});

        await user.save()
        

        res.status(201).json({message:"Registration Successful"});
    

    } catch(err){
        console.log(err)
        
    }




    })

    // login route
    router.post('/signin', async (req,res)=>{
        try{
            
            const {Username,password}= req.body;

            if(!Username|| !password){
                return res.status(400).json({error:"Please fill the data"})
            }

            const userLogin= await User.findOne({Username:Username});

            if(userLogin){
                const isMatch= await bcrypt.compare(password,userLogin.password)

                const token = await userLogin.generateAuthToken();
                

                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+27987000000),
                    httpOnly:true

                });

            if(!isMatch){
                res.status(400).json({error:"Invalid User Credentials"})
            } else{
                res.json({message:"User Signed In"})
            }
            }else{
                res.status(400).json({error:"Invalid User"})

            }

        }catch(err){
            console.log(err)

        }

    });

module.exports=router
