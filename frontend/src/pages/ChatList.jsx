import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChats = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login"); // Перенаправляем на страницу логина, если нет токена
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/channels", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error(`Ошибка при загрузке чатов: ${response.status}`);
                }

                const data = await response.json();
                setChats(data);
            } catch (err) {
                console.error("Ошибка при получении чатов:", err);
                setError(err.message);
            }
        };

        fetchChats();
    }, [navigate]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Список чатов</h2>
            {error ? (
                <p className="text-red-500">{error}</p> // Показываем ошибку, если она есть
            ) : chats.length === 0 ? (
                <p>Нет доступных чатов</p>
            ) : (
                <ul>
                    {chats.map((chat) => (
                        <li
                            key={chat.id}
                            className="border p-2 mb-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate(`/channels/${chat.id}`)}
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
