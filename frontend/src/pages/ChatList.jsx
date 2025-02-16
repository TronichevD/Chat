import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChats = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/api/channels", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                console.error("Ошибка при загрузке чатов");
                return;
            }

            const data = await response.json();
            setChats(data);
        };

        fetchChats();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Список чатов</h2>
            {chats.length === 0 ? (
                <p>Нет доступных чатов</p>
            ) : (
                <ul>
                    {chats.map((chat) => (
                        <li
                            key={chat.id}
                            className="border p-2 mb-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate(`/chat/${chat.id}`)}
                        >
                            {chat.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChatList;
