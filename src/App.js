// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import QuizStart from './components/QuizStart';
import Quiz from './components/Quiz';
import AdminDashboard from './components/AdminDashboard';
import UserData from './components/UserData';
import QuestionData from './components/QuestionData';
import CreateQuestion from './components/CreateQuestion';
import UpdateQuestion from './components/UpdateQuestion';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import LogoutButton from './components/LogoutButton';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogin = (admin) => {
        setIsLoggedIn(true);
        setIsAdmin(admin);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    return (
        <Router>
            <div>
                <header className="header">
                    <h1>Quiz Application</h1>
                </header>
                <nav className="navbar">
                    <Link to="/">Home</Link>
                    {isLoggedIn && (
                        <>
                            {isAdmin && (
                                <>
                                    <Link to="/users">User Data</Link>
                                    <Link to="/questions">Question Data</Link>
                                </>
                            )}
                            <LogoutButton onLogout={handleLogout} /> 
                        </>
                    )}
                </nav>
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    {isLoggedIn && !isAdmin && (
                        <>
                            <Route path="/quiz-start" element={<QuizStart />} />
                            <Route path="/quiz" element={<Quiz />} />
                        </>
                    )}
                    {isLoggedIn && isAdmin && (
                        <>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/users" element={<UserData />} />
                            <Route path="/questions" element={<QuestionData />} />
                            <Route path="/create-user" element={<CreateUser />} />
                            <Route path="/update-user/:id" element={<UpdateUser />} />
                            <Route path="/create-question" element={<CreateQuestion />} />
                            <Route path="/update-question/:id" element={<UpdateQuestion />} />
                        </>
                    )}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;