// src/components/UpdateUser .js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser  = () => {
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser  = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser ();
    }, [id]);

    const handleUpdateUser  = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/users/${id}`, { username });
            navigate('/users');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <div className = 'dashboardstyle'>
            <h2>Update User</h2>
            <form onSubmit={handleUpdateUser }>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button className='button' type="submit">Update User</button>
            </form>
        </div>
        </div>
    );
};

export default UpdateUser;