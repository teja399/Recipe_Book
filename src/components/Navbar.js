import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">Recipe Book</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create-recipe">Create Recipe</Link></li>
          <li><Link to="/map">Recipe Map</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
