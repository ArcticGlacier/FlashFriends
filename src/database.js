const users = [
  {
    id: 1,
    username: "gagan_brar",
    password: "gagan",
    firstname: "Gagan",
    lastname: "Brar",
    schedule: "Mon-Wed-Fri",
  },
  {
    id: 2,
    username: "ritwika101",
    password: "ritwika", // Hashed password: "ritwika"
    firstname: "Ritwika",
    lastname: "Neupane",
    schedule: "Tue-Thu-Sat",
  },
  {
    id: 3,
    username: "rachel07",
    password: "ritwika", // Hashed password: "rachel"
    firstname: "Rachel",
    lastname: "Renegado",
    schedule: "Tue-Thu-Sat",
  },
  {
    id: 4,
    username: "abnerTheJoker",
    password: "ritwika", // Hashed password: "abner"
    firstname: "Abner",
    lastname: "Yousef",
    schedule: "Tue-Thu-Sat",
  },
];

// Simulated friendships data
const friendships = [
  {
    id: 1,
    user1: "Gagan Brar",
    user2: "Ritwika Neupane",
    last_hangout_date: "2023-12-01",
    hangout_count: 5,
  },
  {
    id: 2,
    user1: "Gagan Brar",
    user2: "Rachel Renegado",
    last_hangout_date: "2023-12-05",
    hangout_count: 3,
  },
  {
    id: 3,
    user1: "Gagan Brar",
    user2: "Abner Yousef",
    last_hangout_date: "2023-11-27",
    hangout_count: 1,
  },
  {
    id: 4,
    user1: "Ritwika Neupane",
    user2: "Rachel Renegado",
    last_hangout_date: "2023-06-20",
    hangout_count: 1,
  },
  {
    id: 5,
    user1: "Ritwika Neupane",
    user2: "Aliya Mammadova",
    last_hangout_date: "2023-04-28",
    hangout_count: 7,
  },
];

// Simulated events data
const events = [
  {
    id: 1,
    location: "University of Calgary - Taylor Family Digital Library",
    event_date: "2023-12-15",
    event_time: "",
    title: "TFDL Study Session",
    attendees: ["Gagan Brar", "Ritwika Neupane", "Abner Yousef"], // IDs of Gagan, Ritwika, and Abner
    pictures: [], // Placeholder for pictures (can be URLs or other data)
  },
  // Add more hardcoded events as needed
];

// Retrieve user data based on username and password
function getUserData(username, password) {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return { message: "Invalid username or password" };
  }

  const fullName = user.firstname + " " + user.lastname;
  const userFriendships = friendships.filter(
    (f) => f.user1 === fullName || f.user2 === fullName
  );
  const userEvents = events.filter((event) =>
    event.attendees.includes(user.id)
  );

  return {
    user,
    friendships: userFriendships,
    events: userEvents,
  };
}

function getFriendshipData(user, friends) {
  const fullName = user.firstname + " " + user.lastname;

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
}

function addEvent(details) {
  let newEventID = events.length;
  let newEvent = {
    id: newEventID,
    location: details.location,
    event_date: details.date,
    event_time: details.time,
    title: details.title,
    attendees: details.selectedFriends,
    pictures: [],
  };
  events.push(newEvent);
}

export { getUserData, getFriendshipData, addEvent };
