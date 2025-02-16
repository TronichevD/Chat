import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ChatList from "./pages/ChatList";
import ChatRoom from "./pages/ChatRoom";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/chats" element={<ChatList />} />
            <Route path="/chat/:id" element={<ChatRoom />} /> {/* ✅ Переход в конкретный чат */}
            <Route path="*" element={<Login />} />
        </Routes>
    );
}

export default App;
