import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <div className="p-4">
            <nav className="mb-4">
                <Link to="/" className="mr-4 text-blue-500">Login</Link>
                <Link to="/chat" className="text-blue-500">Chat</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/chat" element={<Chat />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
