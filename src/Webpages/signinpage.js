import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignIn(){
    let navigate=useNavigate();

    const [Username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    const loginUser=async(e)=>{
        e.preventDefault();

        const res= await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                Username,
                password

            })

        });

        const data=res.json();

        if(res.status===400|| !data){
            window.alert("User not Verified")
        }else{
            window.alert("Logged In Successfully")
            navigate('/')
        }
    }








    return(
        <div className="parent">
        <div className="container" id = "dabba2">
            <div className="title" id = "naam2">Login Form</div>
            <div className="content">
                <form method='POST'>
                    <div className="user-details1">
                        <div className="users1">
                        <div className="input-box">
                            <span className="details">User Name</span>
                            <input type="text" placeholder="User Name" required="required"
                            value={Username}
                            onChange={(e)=> setUsername(e.target.value)}
                            
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Password</span>
                            <input type="password" placeholder="Password" required="required"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        </div>
                
                        <div className="checkbox">
                            <span className="details"></span>
                            <input type="checkbox" id="remember-me"/>
                            <label for="remember-me">{'\u00A0'}Remember me</label>
                        </div>   
                        <div className="pass-link">
                            <a href='/forgotpassword' onClick={()=>navigate("/forgotpassword")}>Forgot Password?</a>
                        </div>
                
                    </div>
                        <div className="button">
                        <input type="submit" value="Login"
                        onClick={loginUser}
                        />
                        </div>
            
                    <div className="signup-link">
                        <strong> Not a member? </strong>
                        <a onClick={()=>navigate("/signup")}>SignUp Now</a>
                    </div>
                </form>
            </div>
        </div>
        </div>

    )
}






export default SignIn; 