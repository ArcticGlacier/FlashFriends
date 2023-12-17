import React, { useState } from "react";
import "./App.css";
import { getUserData } from "./database";
import Home from "./Home";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [success, setSuccess] = useState(false); // Successfully logged in

  const handleLogin = () => {
    let userData = getUserData(username, password);
    console.log(userData);
    if (userData.message != null) {
      setError(userData.message);
    } else {
      setSuccess(true);
      setUserData(userData);
      setError("");
    }
  };

  return (
    <div>
      {!success ? (
        <div>
          <h1>Login Page</h1>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <Home userData={userData} />
      )}
    </div>
  );
}

export default App;
