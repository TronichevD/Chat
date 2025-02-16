import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChatRoom = () => {
    const { id } = useParams(); // Получаем ID канала (чата) из URL
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login"); // Если нет токена, перенаправляем
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/messages/channels/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error(`Ошибка при загрузке сообщений: ${response.status}`);
                }

                const data = await response.json();
                setMessages(data);
            } catch (err) {
                console.error("Ошибка при загрузке сообщений:", err);
                setError(err.message);
            }
        };

        fetchMessages();
    }, [id, navigate]);

    const sendMessage = async () => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        if (!username) {
            console.error("Ошибка: username не найден");
            return;
        }

        try {
            // Получаем userId по username
            const userRes = await fetch(`http://localhost:8080/api/users/by-username/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!userRes.ok) {
                throw new Error("Ошибка при получении userId");
            }

            const userData = await userRes.json();
            const userId = userData.id;

            // Отправляем сообщение с userId и channelId (id из useParams)
            const messageRes = await fetch(`http://localhost:8080/api/messages/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId,
                    channelId: id, // Используем id из useParams()
                    content: newMessage, // Отправляемый текст
                }),
            });

            if (!messageRes.ok) {
                throw new Error("Ошибка при отправке сообщения");
            }

            console.log("Сообщение отправлено!");

            // Обновляем список сообщений после отправки
            setMessages([...messages, { id: Date.now(), sender: { username }, content: newMessage }]);
            setNewMessage(""); // Очищаем поле ввода
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Чат</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="border p-4 mb-4 h-64 overflow-y-auto">
                {messages.length === 0 ? (
                    <p>Нет сообщений</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="border-b py-2">
                            <p className="text-sm text-gray-500">{msg.sender.username}</p>
                            <p>{msg.content}</p>
                        </div>
                    ))
                )}
            </div>
            <div className="flex">
                <input
                    type="text"
                    className="border p-2 flex-grow"
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 ml-2"
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;