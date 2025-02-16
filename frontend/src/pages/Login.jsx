import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Здесь только useNavigate

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // ✅ Используем для навигации

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate("/channels"); // ✅ Переход на список чатов
        } else {
            console.error("Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 shadow-md rounded">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
