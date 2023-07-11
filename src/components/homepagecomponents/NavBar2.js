import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../../assets/img/logo2.svg';
import navIcon1 from '../../assets/img/nav-icon1.svg';
import navIcon2 from '../../assets/img/nav-icon2.svg';
import navIcon3 from '../../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
// import {useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";
import {
  BrowserRouter as Router
} from "react-router-dom";

const NavBar2 = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // const navigate=useHistory()

  const [activeLink, setActiveLink] = useState('home');
  // const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // const onScroll = () => {
    //   if (window.scrollY > 50) {
    //     setScrolled(true);
    //   } else {
    //     setScrolled(false);
    //   }
    // }

    // window.addEventListener("scroll", onScroll);

    // return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    
      <Navbar expand="md" >
        <Container style={{width:"1900px"}}>
          <a href="#" style={{marginLeft:"-10vh",
    color: 'white',
    transition: 'color 0.3s ease',
  }}
  onMouseEnter={(e) => {
    e.target.style.color = '#116D6E';
  }}
  onMouseLeave={(e) => {
    e.target.style.color = 'white';
  }}className="logo">COMMUTE.IO</a>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="/PublishARide" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Publish A Ride</Nav.Link>
              <Nav.Link href="/BookARide" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Book a Ride</Nav.Link>  
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="#"><img src={navIcon1} alt="" /></a>
                <a href="#"><img src={navIcon2} alt="" /></a>
                <a href="#"><img src={navIcon3} alt="" /></a>
              </div>
              
                <button className="vvd" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><Link to={'/user-login'}><span style={{ color: isHovered ? 'black' : 'white' }}>Login as User</span></Link></button>
                <button className="vvd" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><Link to={'/administrator-login'}><span style={{ color: isHovered ? 'black' : 'white' }}>Login as Administrator</span></Link></button>
              
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
  )
}

export default NavBar2;
