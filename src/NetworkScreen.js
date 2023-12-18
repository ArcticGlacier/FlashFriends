import React from "react";
import { addEvent, getFriendshipData } from "./database";
import { useState } from "react";
import './NetworkScreen.css';

function NetworkScreen({ user, friends }) {
  const [showForm, setShowForm] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    selectedFriends: [],
  });

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
    addEvent(eventDetails);
    // Handle event submission, could involve sending data to server or other actions
    setShowForm(false);
    // Reset form fields
    setEventDetails({
      title: "",
      location: "",
      date: "",
      time: "",
      selectedFriends: [],
    });
  };

  return (
    <div className="network-form-container">
      {!showForm ? (
        <button className="CreateHangout" onClick={() => setShowForm(true)}>Let's Hangout!</button>
      ) : (
        <form className="network-form" onSubmit={handleSubmit}>
          <label className="inputA">
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
      )}

      {eventDetails.title && (
        <div className="event-details">
          <h3>Event Details:</h3>
          <p>Title: {eventDetails.title}</p>
          <p>Location: {eventDetails.location}</p>
          <p>Time: {eventDetails.time}</p>
          <div>
            {eventDetails.selectedFriends.map((friend, index) => (
              <div
                key={index}
                style={{ display: "inline-block", margin: "5px" }}
              >
                {friend}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NetworkScreen;
