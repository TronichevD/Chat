import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const token = localStorage.getItem("token"); // ✅ Берем токен
                const response = await fetch("http://localhost:8080/api/chats", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch chats");
                }

                const data = await response.json();
                setChats(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchChats();
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 h-screen">
            <h2 className="text-2xl font-semibold mb-4">Chats</h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="w-full max-w-lg bg-white shadow-md rounded-md">
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        onClick={() => navigate(`/chat/${chat.id}`)} // ✅ Переход в ChatRoom
                        className="p-4 border-b hover:bg-gray-200 cursor-pointer"
                    >
                        {chat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
