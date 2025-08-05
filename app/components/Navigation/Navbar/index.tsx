import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href="/discover">
              Discover
            </Link>
          </li>
          <li>
            <Link href="/SavedDishes">
              Saved Dishes
            </Link>
          </li>
          <li>
            <Link href="/randomizer">
              Randomizer
            </Link>
          </li>
          <li>
            <Link href="/adddish">
              Add Dish
            </Link>
          </li>
        </ul>
      </div>
      
    </nav>
  );
};

export default Navbar;