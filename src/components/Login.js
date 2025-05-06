// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('http://localhost:5000/login', { username });
            setMessage(`Login successful! User ID: ${response.data.user_id}`);
            const isAdmin = username === 'admin'; // Example check for admin
            onLogin(isAdmin);
            navigate(isAdmin ? '/admin' : '/quiz-start'); // Redirect based on user type
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
        <div className="loginstyle">
            <h2>Login</h2>
            <div className="formstyle">
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <button className='button' type="submit">Login</button>
            </form>
            </div>
            {message && <p>{message}</p>}
        </div>
        </div>
    );
};

export default Login;