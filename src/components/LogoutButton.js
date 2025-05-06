// src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        onLogout();
        navigate('/'); // Redirect to home after logout
    };

    return (
        <button onClick={handleClick} className="button">
            Logout
        </button>
    );
};

export default LogoutButton;