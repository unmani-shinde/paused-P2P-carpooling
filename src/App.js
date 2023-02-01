// import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Router,Route, BrowserRouter} from 'react-router-dom'
import SignUp from './Webpages/signuppage';
import Home from './mainhome';
import SignIn from './Webpages/signinpage';
import ForgotPassword from './Webpages/forgotpassword';
import OTP from './Webpages/otp';
import ResetPassword from './Webpages/resetpassword';
import BookARide from './Webpages/BookARide';


function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/forgotpassword' element={<ForgotPassword/>}/>
    <Route path='/otp' element={<OTP/>}/>
    <Route path='/resetpassword' element={<ResetPassword/>}/>
    <Route path='/BookARide' element={<BookARide/>}/>
    <Route path='/PublishARide' element={<BookARide/>}/>

    </Routes>
    
    </>
  );
}

export default App;
