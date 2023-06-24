import { useState } from "react";
import "../stylesheets/SignUpPage.css"

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfRegistration, setDateOfRegistration] = useState(new Date().toLocaleDateString());
  const [location, setLocation] = useState("");
  const [hasVehicle, setHasVehicle] = useState("");
  const [metamaskAccount, setMetamaskAccount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
  };

  return (
    <div className="back-card">
      <div className="back-card-image-container">Hi!</div>
      <div className="back-card-form-container"><form onSubmit={handleSubmit}>
        <p className="back-card-form-container-header" style={{fontSize:"20px", marginTop:"-1vh", fontWeight:"bold", color:"#37306B"}}>Welcome Aboard, Commuter!</p>
    <label>
      First Name:
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
    </label>
    <label>
      Last Name:
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
    </label>
    <label>
      Date of Registration:
      <input type="text" value={dateOfRegistration} disabled />
    </label>
    <label>
      Location:
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
    </label>
    <label>
      Vehicle Ownership:
      <input type="text" checked={hasVehicle} onChange={(e) => setHasVehicle(e.target.checked)} />
    </label>
    <label>
      Metamask Account Address:
      <input type="text" value={metamaskAccount} onChange={(e) => setMetamaskAccount(e.target.value)} />
    </label>
    <button type="submit">Sign Up</button>
    <p className="already-have-an-account" style={{color:"#37306B"}}>Already have an account? Click here</p>
  </form></div>
      
      
      </div>
    
  );
};

export default SignupForm;