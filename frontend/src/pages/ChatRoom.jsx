import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/api/channels/${id}/messages`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                console.error("Ошибка при загрузке сообщений");
                return;
            }

            const data = await response.json();
            setMessages(data);
        };

        fetchMessages();
    }, [id]);

    const sendMessage = async () => {
        const token = localStorage.getItem("token");

        if (!message.trim()) return;

        const response = await fetch(`http://localhost:8080/api/channels/${id}/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ content: message }),
        });

        if (response.ok) {
            const newMessage = await response.json();
            setMessages([...messages, newMessage]);
            setMessage("");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Чат</h2>
            <div className="border p-4 mb-4 h-64 overflow-auto">
                {messages.length === 0 ? (
                    <p>Нет сообщений</p>
                ) : (
                    messages.map((msg) => (
                        <p key={msg.id} className="p-2 border-b">
                            {msg.content}
                        </p>
                    ))
                )}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border p-2 flex-grow"
                    placeholder="Введите сообщение..."
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2">
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
