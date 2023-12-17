import React, { useEffect } from "react";
import { getFriendshipData } from "./database";

function ProfileScreen({ user, friends }) {
  const friendNames = getFriendshipData(user, friends);

  return (
    <div>
      <img className="profilePic"></img>
      <h2>Friend Details:</h2>
      <ul>
        {friendNames.map((friend, index) => (
          <li key={index}>
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
