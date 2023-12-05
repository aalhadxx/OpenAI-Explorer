import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="hamburger" onClick={toggleNavLinks}>
          &#9776;
        </div>
        <ul className={`nav-links ${showNavLinks ? 'show' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/Image">Image</Link></li>
          <li><Link to="/TTS">TTS</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
