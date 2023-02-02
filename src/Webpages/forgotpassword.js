import React from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword(){

    let navigate=useNavigate();
    return(

        <div className="container" style={{width:"800px"}}>
            <div className="title">Forgot Password</div>
            <div className="content">
                <form>
                    <div className="user-details">
                        <div className="input-box" style={{margin:"auto",textAlign: "center",fontSize:"larger",boxSizing:"border-box"}}>
                            <span className="details">Phone Number</span>
                            <input type="number" placeholder="Phone Number" required="required"/>
                        </div>
                    </div>
                    <div className="button" id="Otp" >
                        <input type="submit" value="Enter" onClick={()=>navigate("/otp")}/>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;