import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./Chat.scss";

const Chat = ({ socket }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const socketId = localStorage.getItem("socketId");
  const room = localStorage.getItem("room");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (!socketId || !room) {
      navigate("/login");
    }
    socket.on(room, ({ username, message }) => {
      setMessages([...messages, { username, message }]);
    });
  });

  const displayMessages = () => {
    return messages.map(({ username: user, message }, index) => {
      let className = "message";
      if (user === username) className += " right";
      else className += " left";
      return (
        <div key={message + index} className={className}>
          <p>{user}</p>
          <p>{message}</p>
        </div>
      );
    });
  };

  const handleLogout = ({ event }) => {
    event.preventDefault();
    socket.emit("disjoin", { username, room }, callbackResponse);
  };

  const callbackResponse = ({ response }) => {
    if (response.success) {
      localStorage.removeItem("socketId");
      localStorage.removeItem("room");
      navigate("/login");
    }
  };

  const handleTypeMessage = ({ message }) => {
    setMessage(message);
  };

  const handleSendMessage = ({ event }) => {
    event.preventDefault();
    setMessages([...messages, { username, message }]);
    socket.emit("send-message", { username, room, message });
    document.getElementById("message-input").value = "";
  };

  return (
    <div className="chat-container">
      <div className="navbar">
        <Navbar handleLogout={handleLogout} />
      </div>
      <div className="chat-message">
        <div className="chat-show">{displayMessages()}</div>
        <div className="chat-input">
          <input id="message-input" type="text" name="message" onChange={(event) => handleTypeMessage({ message: event.target.value })} />
          <button onClick={(event) => handleSendMessage({ event })}>send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
