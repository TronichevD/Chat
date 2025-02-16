import React from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
            <h1 className="text-3xl font-bold mb-4">Чат</h1>
            <p>Добро пожаловать!</p>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white p-2 rounded">
                Выйти
            </button>
        </div>
    );
};

export default Chat;
