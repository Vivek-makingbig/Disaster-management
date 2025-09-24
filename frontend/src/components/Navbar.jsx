import React from 'react'
import '../style/navbar.css';

import {Link} from 'react-router-dom';
function Navbar() {
  return (
    <div className="navbar" id="myNavbar">
  <a className='navitem'><Link to="/">Home</Link></a>
   <a className='navitem'><Link to="/news">Disaster Guide</Link></a>
   <a className='navitem'><Link to="/contact">Contact</Link></a>
  
   {/* <button className='navlogin'><Link to="/login">
   Login
   </Link></button> */}

   </div>
  )
}

export default Navbar
