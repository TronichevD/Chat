import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ChatList from "./pages/ChatList";

function App() {
    return (
        <Router>  {/* Единственный Router в приложении */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/chats" element={<ChatList />} />
                <Route path="*" element={<Login />} /> {/* 404 - редирект на Login */}
            </Routes>
        </Router>
    );
}

export default App;
