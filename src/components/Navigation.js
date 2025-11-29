import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎂 Cake Paradise
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/customer-dashboard" className="nav-link">My Orders</Link>
          </li>
          <li className="nav-item">
            <Link to="/worker-dashboard" className="nav-link">Worker Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
