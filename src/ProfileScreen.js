import React, { useEffect } from "react";
import { getFriendshipData } from "./database";
import "@fontsource/jetbrains-mono";
import './ProfileScreen.css';
//import cat from 'cat.jpg';
//import waterfall from './waterfall.jpg';
//import concert from './concert.jpg';

function ProfileScreen({ user, friends }) {
  const friendNames = getFriendshipData(user, friends);
  return (
    <div>
      <h2>Friend Details:</h2>
      <ul>
        {friendNames.map((friend, index) => (
          <li key={index} className="boxfriend">
            <strong>Name:</strong> {friend.friend}
            <br />
            <strong>Last Hangout:</strong> {friend.last_hangout_date}
            <br />
            <strong>Number of Hangouts:</strong> {friend.hangout_count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileScreen;
