// src/components/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
    return (
        <div>
        <div className="dashboardstyle">
            <h2>Admin Dashboard</h2>
        </div>
            <nav>
            <div className="dashboardstyle">
                <Link to="/users">User  Data</Link>
                <Link to="/questions">Question Data</Link>
                <Link to="/create-user">Create User</Link>
                <Link to="/create-question">Create Question</Link>
            </div>
            </nav>
        </div>
    );
};

export default AdminDashboard;