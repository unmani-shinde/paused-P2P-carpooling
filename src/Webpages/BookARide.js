import React from 'react';
// import { useNavigate } from 'react-router-dom';

function BookARide(){

    // let navigate=useNavigate();
    return(
        <div className="container">
        <div className="title">Book A Ride</div>
        <div className="content">
          <form action="#">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Origin</span>
                <input type="text" placeholder="Enter your Origin" required/>
              </div>
              <div className="input-box">
                <span className="details">Destination</span>
                <input type="text" placeholder="Enter your Destination" required/>
              </div>
              <div className="input-box">
                <span className="details">Departure Time</span>
                <input type="time" placeholder="Enter your email" required/>
              </div>
              <div className="input-box">
                <span className="details">Seats Available</span>
                <input type="number" placeholder="Choose Seats Available" required/>
              </div>
              <div className="input-box">
                <span className="details">Fair</span>
                <input type="number" min="0" step="any" placeholder="Enter your Number" required/>
              </div>
    
            </div>
    
            <div className="button">
              <input type="submit" value="Register"/>
            </div>
          </form>
        </div>
      </div>
    

    )

}


export default BookARide;
