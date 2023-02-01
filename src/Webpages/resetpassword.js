import React from 'react';
import { useNavigate } from 'react-router-dom';


function ResetPassword(){
    let navigate=useNavigate();
    return(


        <div className="container" style={{width:"880px"}}>
            <div className="title">Reset Password</div>
            <div className="content">
                <form action="">
                    <div className="user-details">
                        <div className="input-box" style={{margin:"auto",textAlign:"center",fontSize: "larger"}}>
                            <span className="details">Enter New Password</span>
                            <input type="password" placeholder="New Password" required/>
                        </div>
                        <div className="input-box" style={{margin:"auto",textAlign:"center",fontSize: "larger"}}>
                            <span className="details">Confirm Password</span>
                            <input type="password" placeholder="Confirm Password" required/>
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" value="Enter" onClick={()=>navigate("/signin")}/>
                    </div>
                </form>
            </div>
        </div>
        )
    }


export default ResetPassword;