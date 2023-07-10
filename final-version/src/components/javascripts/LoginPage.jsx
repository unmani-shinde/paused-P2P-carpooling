import React from 'react';
import LoginPage from '../testing-javascripts/Login';
import AdministratorDashboardPassengers from './administrator-dashboard-enrolled-passengers';
import "../stylesheets/administrator-dashboard-requests.css";
import { Link } from 'react-router-dom';

const CombinedLoginPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '20px' }}>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <button style={{ padding: '10px 20px', backgroundColor: '#2b8a6b', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}><Link style={{color:'#FEFEFA'}} to={`/user-login`} className="login">
    Login as User</Link></button>
        <button style={{ padding: '10px 20px', backgroundColor: '#2b8a6b', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}><Link style={{color:'#FEFEFA'}} to={`/administrator-login`} className="login">
   Login as Administrator</Link></button>
      </div>
    </div>
  );
};

export default CombinedLoginPage;