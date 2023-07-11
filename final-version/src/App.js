import React from 'react';
import "./App.css";

import AdministratorDashboardRequests from './components/javascripts/administrator-dashboard-requests';
import AdministratorDashboardUserRegistration from './components/javascripts/user-registration';
import AdministratorDashboardUserApplicationStatus from './components/javascripts/user-application-status';
import AdministratorDashboardPassengers from './components/javascripts/administrator-dashboard-enrolled-passengers';
import HomePageFinal from "./components/javascripts/HomePageFinal";
import Inbox from './components/javascripts/RideInbox';

//import ProfilePhotoUploader from './components/testing-javascripts/Profile-Picture-Uploader.jsx';
// import LoginForm from './components/javascripts/LoginPage';
// import SignUpForm from './components/javascripts/SignUpPage';
// import MetaMask from './components/javascripts/Metamask';
// import SignUpForm from './components/javascripts/SignUpPage';\
// import API from './components/javascripts/API';
// import AxiosAPI from './components/javascripts/axiosAPI';
// import Passenger from './components/javascripts/contracttesting';

// import ModalCall from './components/javascripts/Modal';
// import ContractTesting from "./components/javascripts/contracttesting";

// import DashboardLanding from '../src/components/javascripts/dashboard-landing.jsx';
// import {Routes,Router,Route, BrowserRouter} from 'react-router-dom';


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './components/testing-javascripts/Login.jsx';
import Login from "./components/javascripts/LoginPage.jsx";
import ProfilePictureEditor from './components/testing-javascripts/profile-picture-editor';
import DashboardPage from './components/testing-javascripts/Dashboard.jsx';
import MainMap from './components/testing-javascripts/mainMap.jsx';
import RideHistory from './components/javascripts/RideHistory.jsx';
import CurrentRide from './components/javascripts/CurrentRide.jsx';
import ViewAllRides from './components/testing-javascripts/view-all-rides.jsx';
import StartARide from './components/testing-javascripts/StartARidePage.jsx';
import MyCurrentRidesBooked from "./components/javascripts/my-current-rides-booked.jsx";
import BookARideTest from "./components/supplementary-components/test-book-a-ride.jsx"

// import "./components/testing-javascripts/Login.jsx"

// import LandingPage from './components/javascripts/HomePageFinal';
// import ProfilePictureEditorTest from './components/supplementary-components/pfp-test';

// function App() {

//   return (
//     <div className="App">
//      <LandingPage></LandingPage>
//       {/* <AdministratorDashboardPassengers></AdministratorDashboardPassengers>
//       <AdministratorDashboardRequests></AdministratorDashboardRequests>
//       <AdministratorDashboardUserRegistration></AdministratorDashboardUserRegistration>
//       <AdministratorDashboardUserApplicationStatus></AdministratorDashboardUserApplicationStatus> */}
//     </div>
//    );
// }

 




function App2() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={HomePageFinal} />
      <Route exact path="/commute-io-verification-portal" component={AdministratorDashboardUserApplicationStatus} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/pfp" component={ProfilePictureEditor} />
        <Route path='/viewallrides/:passengerID' component={ViewAllRides} />
        <Route path="/dashboard/:passengerID" component={DashboardPage} />
        <Route path="/myinprogressrides/:passengerID" component={MyCurrentRidesBooked} />
        <Route path="/ridehistory/:passengerID" component={RideHistory}/>
        <Route path="/startaride/:passengerID" component={MainMap}/>
        <Route path="/viewselectedupcomingride/:passengerID/:rideID" component={CurrentRide}/>
        <Route path='/new-application-for-passenger' component={AdministratorDashboardUserRegistration}/>
        <Route path='/user-login' component={LoginPage}/>
        <Route path='/administrator-login' component={AdministratorDashboardPassengers}/>
        <Route path='/enrolled-passengers' component={AdministratorDashboardPassengers}/>
        <Route path='/passenger-requests' component={AdministratorDashboardRequests}/>
        <Route path='/enterRideInbox/:passengerID' component={Inbox}/>
      </Switch>
    </Router>
    // <ProfilePhotoUploader></ProfilePhotoUploader>
  );
}
export default App2; 
// export default App;

// function App(){
//   return(
//    <ProfilePictureEditorTest></ProfilePictureEditorTest>

//   );
// }

// export default App;


