import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'



function SignUp(){
    let navigate=useNavigate();

    const [user,setUser]= useState({
        Fullname:"",
        Username:"",
        email:"",
        phonenumber:"",
        password:"",
        cpassword:"",
        

    })

    let name,value;

    const handleInputs =(e)=>{
        
        
        name= e.target.name;
        value=e.target.value;

        setUser({...user,[name]:value})

    }

    const PostData= async(e)=>{
        e.preventDefault();        
        const {Fullname,Username,email,phonenumber,password,cpassword}= user;

        const res  =await fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Fullname,Username,email,phonenumber,password,cpassword
            })
        })

        const data = await res.json();

        if(data.status===422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");

        } else{
            window.alert("Registration Successful");
            console.log("Registration Successful");

            navigate("/signin")
        }



    }

    return(
        <div className='parent'>
            <div className="container" style={{width:"800px"}}>
                <div className="title">SIGN UP</div>
                <div className="content">
                    <form method='POST'/>
                        <div className="user-details" >
                            <div className="input-box">
                                <span className="details">Full Name</span>
                                <input type="text" name='Fullname'
                                value={user.Fullname}
                                onChange={handleInputs}
                                placeholder="Enter your name" required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Username</span>
                                <input type="text" name='Username'
                                value={user.Username}
                                onChange={handleInputs}
                                placeholder="Enter your username" required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="email" name='email'
                                value={user.email}
                                onChange={handleInputs}
                                placeholder="Enter your email" required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="number" name='phonenumber'
                                value={user.phonenumber}
                                onChange={handleInputs} 
                                placeholder="Enter your number" required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Password</span>
                                <input type="password" name='password'
                                value={user.password}
                                onChange={handleInputs}
                                placeholder="Enter your password" required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Confirm Password</span>
                                <input type="password" name='cpassword'
                                value={user.cpassword}
                                onChange={handleInputs}
                                placeholder="Confirm your password" required/>
                            </div>
                        </div>
                        <div className="gender-details" style={{padding:"2rem"}}>
                            <p>Gender:</p>
                            <input type="radio" name="gender" /> Male 
                            <input type="radio" name="gender" /> Female
                            <input type="radio" name="gender" /> Prefer Not To Say	

                        </div>
                        <div className="button">
                            <input type="submit" name="signup" value="SignUp"
                            onClick={PostData}
                            />
                        </div>
            
                        <div className="login-link">
                           <strong> Already a member? </strong> 
                           
                            <a href="/signin" onClick={()=>navigate("/signin")}>Login Now</a>
                           
                    
                        </div>
                    
                    
                </div>
            </div>
            

        </div>
        
        

        )
    }


            

export default SignUp; 