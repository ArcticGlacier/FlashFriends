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

  console.log(friendships);
  return (
    <Router>
      <Routes>
        <Route path="/map" element={<MapScreen />} />
        <Route
          path="/network"
          element={<NetworkScreen user={user} friends={friendships} />}
        />
        <Route
          path="/profile"
          element={<ProfileScreen user={user} friends={friendships} />}
        />
      </Routes>
      <BottomNavbar />
    </Router>
  );
}

export default Home;
