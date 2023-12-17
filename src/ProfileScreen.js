import React, { useEffect } from "react";

function ProfileScreen({ user, friends }) {
  const fullName = user.firstname + " " + user.lastname;
  console.log(friends);

  const findFriends = () => {
    let friendNames = []; // Initialize an empty array to store friend names

    friends.forEach((friend) => {
      let friendInfo = {
        friend: "",
        last_hangout_date: friend.last_hangout_date,
        hangout_count: friend.hangout_count,
      };
      if (friend.user1 !== fullName) {
        friendInfo.friend = friend.user1;
        friendNames.push(friendInfo); // Push friend.user1 to friendNames array if condition is met
      } else {
        friendInfo.friend = friend.user2;
        friendNames.push(friendInfo); // Push friend.user2 to friendNames array if condition is not met
      }
    });

    return friendNames; // Return the array of friend names
  };

  const friendNames = findFriends();
  console.log(friendNames);

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
