import http from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";

dotenv.config();

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

let users = {};

io.on("connection", (socket) => {
  const broadcastToRoom = ({ username, room, message }) => {
    socket.broadcast.emit(room, { username, message });
  };
  console.log("user connected");
  socket.on("join", ({ username, room }, callbackResponse) => {
    users[username] = { socketId: socket.id, room };
    broadcastToRoom({ username: "ADMIN", room, message: `${username} has joined` });
    callbackResponse({ response: { success: true, socketId: socket.id } });
  });
  socket.on("disjoin", ({ username, room }, callbackResponse) => {
    console.log({ username });
    delete users[username];
    broadcastToRoom({ username: "ADMIN", room, message: `${username} has disconnected` });
    callbackResponse({ response: { success: true } });
  });
  socket.on("send-message", ({ username, room, message }) => {
    broadcastToRoom({ username, room, message });
  });
});

const PORT = 3500 || process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`This server is listening on port ${PORT}`);
});
