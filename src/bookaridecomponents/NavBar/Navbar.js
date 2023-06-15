import React from 'react';
import './Navbar.css'
import {SiYourtraveldottv} from 'react-icons/si'
import {AiFillCloseCircle} from 'react-icons/ai'
import {TbGridDots} from 'react-icons/tb'

const Navbar =()=>{
    return(
        <section className='navBarSection'>
            <div className='header'>
                <div className='logoDiv'>
                    <a href="#" className='logo'>
                        <h1 className='flex'><SiYourtraveldottv className='icon'/>
                        COMMUTE.IO
                        </h1>
                    </a>

                </div>

                <div className='navBar'>
                    <ul className='navLists flex'>
                        <li className='navItem'>
                            <a href="/" className='navLink'>Home</a>
                        </li>

                        <li className='navItem'>
                            <a href="#" className='navLink'>About</a>
                        </li>

                        <li className='navItem'>
                            <a href="#" className='navLink'>Popular Rides</a>
                        </li>

                        <li className='navItem'>
                            <a href="#" className='navLink'>Experience</a>
                        </li>

                        <div className='headerBtns flex'>
                            <button className='btn loginBtn'>
                                <a href='/signin'>Login</a>
                            </button>

                            <button className='btn loginBtn'>
                                <a href='/signup'>SignUp</a>
                            </button>

                        </div>

                    </ul>
                    
                </div>

                <div className='toggleNavbar'>
                    <TbGridDots className='icon'/>

                </div>
            </div>

        </section>
        
    )
}

export default Navbar;