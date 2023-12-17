import React from "react";
import { addEvent, getFriendshipData, getActiveEvent } from "./database";
import { useState, useEffect } from "react";

function NetworkScreen({ user, friends }) {
  const [showForm, setShowForm] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    selectedFriends: [],
  });
  const [activeEvent, setActiveEvent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const friendNames = getFriendshipData(user, friends);

  const handleFriendSelect = (friendName) => {
    const isSelected = eventDetails.selectedFriends.includes(friendName);
    if (isSelected) {
      const updatedFriends = eventDetails.selectedFriends.filter(
        (friend) => friend !== friendName
      );
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        selectedFriends: updatedFriends,
      }));
    } else {
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        selectedFriends: [...prevDetails.selectedFriends, friendName],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(user, eventDetails);
    // Handle event submission, could involve sending data to server or other actions
    setShowForm(false);
    setActiveEvent(true);
  };

  useEffect(() => {
    let details = getActiveEvent(user);

    if (
      details &&
      details.title != null &&
      details.title !== "" &&
      details.selectedFriends !== undefined // Additional check
    ) {
      setEventDetails({
        title: details.title,
        location: details.location,
        date: details.date,
        time: details.time,
        selectedFriends: details.selectedFriends,
      });
      setActiveEvent(true);
    } else {
      setActiveEvent(false);
      // Handle a case where active event details are not available
      setEventDetails({
        title: "",
        location: "",
        date: "",
        time: "",
        selectedFriends: [],
      });
    }
  }, []);

  function displayForm() {
    if (!showForm && !activeEvent) {
      return <button onClick={() => setShowForm(true)}>Create Event</button>;
    } else if (showForm) {
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Event Title:
            <input
              type="text"
              name="title"
              value={eventDetails.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={eventDetails.location}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Time:
            <input
              type="text"
              name="time"
              value={eventDetails.time}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date:
            <input
              type="text"
              name="date"
              value={eventDetails.date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Select Friends:
            <ul>
              {friendNames.map((friend) => (
                <li key={friend.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={eventDetails.selectedFriends.includes(
                        friend.friend
                      )}
                      onChange={() => handleFriendSelect(friend.friend)}
                    />
                    {friend.friend}
                  </label>
                </li>
              ))}
            </ul>
          </label>
          <button type="submit">Submit</button>
        </form>
      );
    }
  }

  return (
    <div>
      {displayForm()}
      {eventDetails.title && (
        <div style={{ position: "relative", marginTop: "20px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "10px",
              backgroundColor: "#f0f0f0",
            }}
          >
            <p>Title: {eventDetails.title}</p>
            <p>Location: {eventDetails.location}</p>
            <p>Time: {eventDetails.time}</p>
          </div>
          {eventDetails.selectedFriends.map((friend, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: "-50px",
                left: `${index * 100}px`,
                backgroundColor: "#f0f0f0",
                padding: "5px",
                borderRadius: "50%",
              }}
            >
              {friend}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NetworkScreen;
