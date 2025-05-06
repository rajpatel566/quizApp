// src/components/CreateQuestion.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuestion = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState({ option1: '', option2: '', option3: '', option4: '' });
    const [correctOption, setCorrectOption] = useState('');
    const navigate = useNavigate();

    const handleCreateQuestion = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/questions', { question, ...options, correct_option: correctOption });
            navigate('/questions');
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    return (
        <div>
            <h2>Create Question</h2>
            <form onSubmit={handleCreateQuestion}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Question"
                    required
                />
                <input
                    type="text"
                    value={options.option1}
                    onChange={(e) => setOptions({ ...options, option1: e.target.value })}
                    placeholder="Option 1"
                    required
                />
                <input
                    type="text"
                    value={options.option2}
                    onChange={(e) => setOptions({ ...options, option2: e.target.value })}
                    placeholder="Option 2"
                    required
                />
                <input
                    type="text"
                    value={options.option3}
                    onChange={(e) => setOptions({ ...options, option3: e.target.value })}
                    placeholder="Option 3"
                    required
                />
                <input
                    type="text"
                    value={options.option4}
                    onChange={(e) => setOptions({ ...options, option4: e.target.value })}
                    placeholder="Option  4"
                    required
                />
                <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)} required>
                    <option value="">Select Correct Option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                </select>
                <button className='button' type="submit">Save Question</button>
            </form>
        </div>
    );
};

export default CreateQuestion;