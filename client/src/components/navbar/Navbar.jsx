import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <div className="left"></div>
      <div className="right">
        <button onClick={(event) => handleLogout({ event })}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
