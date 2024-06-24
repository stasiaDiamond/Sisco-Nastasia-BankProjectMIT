// client/src/components/NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">BadBank Home</NavLink>
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          {user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/deposit">Deposit</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/withdraw">Withdraw</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/balance">Balance</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/all-data">All Data</NavLink>
              </li>
            </>
          )}
        </ul>
        {user && (
          <span className="navbar-text ml-auto">
            {user.email}
          </span>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
