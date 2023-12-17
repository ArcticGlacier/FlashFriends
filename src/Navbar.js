import React from "react";
import "./Navbar.css"; // Import CSS file for styling
import { Link } from "react-router-dom";

function BottomNavbar() {
  return (
    <div>
      <div className="bottom-navbar">
        <Link to="/map">Map</Link>
        <Link to="/network">Network</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default BottomNavbar;
