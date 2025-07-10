import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/discover">Discover</a>
      </li>
      <li>
        <a href="/saveddishes">Saved Dishes</a>
      </li>
      <li>
        <a href="/randomizer">Randomizer</a>
      </li>
    </ul>
  </div>
  
</nav>
);
};

export default Navbar;