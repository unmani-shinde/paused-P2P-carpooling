
import React from 'react';
import { useNavigate } from 'react-router-dom';


function OTP(){
    let navigate=useNavigate();
    return(

        <div className="container" style={{width:"880px"}}>
            <div className="title">Enter OTP</div>
            <div className="content">
                <form action="">
                    <div className="user-details">
                        <div className="input-box" style={{margin:"auto", textAlign: "center",fontSize: "larger"}}>
                            <span className="details">Enter OTP</span>
                            <input type="number" placeholder="Enter the OTP"/>
                        </div>
                    </div>
                    <div className="button">
                        
                    <input type="submit" value="Enter" onClick={()=>navigate("/resetpassword")}/>
                    </div>
                </form>
            </div>
        </div>
        )
    }


export default OTP;
