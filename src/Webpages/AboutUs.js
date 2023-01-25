import React from "react";
// import "./aboutus.css"

function aboutUs() {
  return (
    <div className="home">
      <div className="about">
        <h2> About Us</h2>
        <div className="prompt">
          <p>We here at CARAVAN offer mobility as a service , we offer carpooling/ridesharing so that everyday travels go easy on your pockets and the environment.
            CARAVAN sets fares, which vary using a dynamic pricing model based on local supply and demand at the time of the booking and are quoted to the customer in advance, and receives a commission from each booking.</p>
          
        </div>
      </div>
      <div className="links">
        <h1> LINKS</h1>
        <ol className="list">
          
          <li className="item">
            <h2><a href="https://github.com/unmani-shinde/paused-P2P-carpooling">Github</a> </h2>
            
          </li>
          <li className="item">
          <h2><a href="https://instagram.com">Insta</a> </h2>
          </li>
          <li className="item">
          <h2><a href="https://youtu.be">Youtube</a> </h2>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default aboutUs;