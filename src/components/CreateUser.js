// src/components/CreateUser .js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser  = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleCreateUser  = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/signup', { username });
            navigate('/users');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <div className="dashboardstyle">
            <h2>Create User</h2>
            <form onSubmit={handleCreateUser }>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <button className="button" type="submit">Create User</button>
            </form>
        </div>
        </div>
    );
};

export default CreateUser;