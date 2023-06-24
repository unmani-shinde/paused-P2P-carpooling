import React from 'react';
import UserApplicationStatus from "../javascripts/user-application-status";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <button style={{ padding: '10px 20px', backgroundColor: '#2b8a6b', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}><Link style={{color:'#FEFEFA'}} to={`/login`} className="login">
    Login</Link></button>
        <button style={{ padding: '10px 20px', backgroundColor: '#2b8a6b', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}><Link style={{color:'#FEFEFA'}} to={`/commute-io-verification-portal`} className="login">
    Sign Up</Link></button>
      </div>
    </div>
  );
};


export default LandingPage;

