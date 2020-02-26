import React from "react";
import { Link, NavLink } from "react-router-dom";

const renderLoginAndRegister = () => {
  return (
    <React.Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </li>
    </React.Fragment>
  );
};

const renderUserAndLogout = user => {
  return (
    <React.Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" to="/profile">
          {user.name}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/logout">
          Logout
        </NavLink>
      </li>
    </React.Fragment>
  );
};

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <div id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/rentals">
              Rentals
            </NavLink>
          </li>
          {!user && renderLoginAndRegister()}
          {user && renderUserAndLogout(user)}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
