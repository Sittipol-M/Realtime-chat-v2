import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";

function App({ socket }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
