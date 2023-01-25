import React from 'react';

import SignIn from './Webpages/signinpage';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SignUp from './Webpages/signuppage';
import ForgotPassword from './Webpages/forgotpassword';
import OTP from './Webpages/otp';
import ResetPassword from './Webpages/resetpassword';
import Home from './Webpages/Home';
import BookARide from './Webpages/BookARide';
import PublishARide from './Webpages/PublishARide';




function App(){
  return(
    <>
    
    <Router>
      <div>
      
      
      

      <Routes>

        <Route path='/' element={<Home/>}/>

        <Route path="/signup" element={<SignUp/>}/>

        <Route path="/signin" element={<SignIn/>}/>

        <Route path="/forgotpassword" element={<ForgotPassword/>}/>

        <Route path="/otp" element={<OTP/>}/>

        <Route path="/resetpassword" element={<ResetPassword/>}/>

        <Route path="/BookARide" element={<BookARide/>}/>

        <Route path="/PublishARide" element={<PublishARide/>}/>

        








        
      </Routes>
      </div>

      
    </Router>
    </>
    
  );
};

export default App;