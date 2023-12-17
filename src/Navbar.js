import React from "react";
import "./Navbar.css"; // Import CSS file for styling
import { Link } from "react-router-dom";
import "@fontsource/jetbrains-mono";
import { IoPin } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { LiaNetworkWiredSolid } from "react-icons/lia";

function BottomNavbar() {
  return (
    <div>
      <div className="bottom-navbar">
        <Link to="/map">
          <IoPin className="map" />
        </Link>
        <Link to="/network">
          <LiaNetworkWiredSolid className="network" />
        </Link>
        <Link to="/profile">
          <IoPersonSharp className="profile" />
        </Link>
      </div>
    </div>
  );
}

export default BottomNavbar;
