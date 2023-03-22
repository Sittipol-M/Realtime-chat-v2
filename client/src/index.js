import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import io from "socket.io-client";
import ENV from "./env.json";
const socket = io(ENV.SOCKET_API);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>
);
