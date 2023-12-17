import * as React from "react";
import BottomNavbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapScreen from "./MapScreen";
import NetworkScreen from "./NetworkScreen";
import ProfileScreen from "./ProfileScreen";

function Home({ userData }) {
  const user = userData.user;
  const friendships = userData.friendships;
  const events = userData.events;
  return (
    <Router>
      <Routes>
        <Route path="/map" element={<MapScreen />} />
        <Route path="/network" element={<NetworkScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
      <BottomNavbar />
    </Router>
  );
}

export default Home;
