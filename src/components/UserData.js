// src/components/UserData.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import moment from 'moment'

const UserData = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h2>User Data</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Total Attempts</th>
                        <th>Total Money Won</th>
                        <th>Timestamp</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.attempt_count}</td>
                            <td>{user.money_won}</td>
                            <td>{user.attempt_timestamp}</td> 
                            <td>
                                <Link to={`/update-user/${user.id}`} className="button">Edit</Link>
                                <button onClick={() => handleDelete(user.id)} className="button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/create-user" className="button">Create New User</Link>
        </div>
    );
};

export default UserData;