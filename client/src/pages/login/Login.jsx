import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = ({ socket }) => {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (localStorage.getItem("socketId")) {
      navigate("/chat");
    }
  }, []);

  const callbackResponse = ({ response }) => {
    const { success, socketId } = response;
    if (success && room.length > 0 && username.length > 0) {
      localStorage.setItem("socketId", socketId);
      localStorage.setItem("room", room);
      localStorage.setItem("username", username);
      navigate("/chat");
    }
  };

  const handleTypeUsername = ({ username }) => {
    setUsername(username);
  };

  const handleTypeRoom = ({ room }) => {
    setRoom(room);
  };

  const handleConnect = ({ event }) => {
    event.preventDefault();
    socket.emit("join", { username, room }, callbackResponse);
  };

  return (
    <div className="login-container">
      <h1>Connect Room</h1>
      <form>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(event) => {
            handleTypeUsername({ username: event.target.value });
          }}
          required
        />
        <input
          type="text"
          name="room"
          placeholder="room"
          onChange={(event) => {
            handleTypeRoom({ room: event.target.value });
          }}
          required
        />
        <button onClick={(event) => handleConnect({ event })}>connect</button>
      </form>
    </div>
  );
};

export default Login;
