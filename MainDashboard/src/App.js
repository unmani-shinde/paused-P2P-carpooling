import logo from './logo.svg';
import './App.css';
import DashboardLanding from './DashboardLanding';
import {Routes,Router,Route, BrowserRouter} from 'react-router-dom';
import RideHistory from './RideHistory';
import CurrentRide from './CurrentRide';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<DashboardLanding/>}/>
      <Route path="/currentride" element={<CurrentRide/>}/>
      <Route path="/ridehistory" element={<RideHistory/>}/>
      {/* <Route path="/inbox" element={<Inbox/>}/> */}
    </Routes>
    </>
  );
}

export default App;
