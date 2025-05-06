// src/components/QuizStart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizStart = () => {
    const navigate = useNavigate();

    const startQuiz = () => {
        navigate('/quiz'); // Navigate to the quiz page
    };

    return (
        <div>
            <div className="dashboardstyle">
            <h2>Welcome to the Quiz!</h2>
            <button className='button' onClick={startQuiz}>Start Quiz</button>
            </div>
        </div>
    );
};

export default QuizStart;