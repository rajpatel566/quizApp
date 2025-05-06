// src/components/UpdateQuestion.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateQuestion = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState({ option1: '', option2: '', option3: '', option4: '' });
    const [correctOption, setCorrectOption] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/questions/${id}`);
                setQuestion(response.data.question);
                setOptions({
                    option1: response.data.option1,
                    option2: response.data.option2,
                    option3: response.data.option3,
                    option4: response.data.option4,
                });
                setCorrectOption(response.data.correct_option);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        fetchQuestion();
    }, [id]);

    const handleUpdateQuestion = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/questions/${id}`, { question, ...options, correct_option: correctOption });
            navigate('/questions');
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    return (
        <div>
            <h2>Update Question</h2>
            <form onSubmit={handleUpdateQuestion}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={options.option1}
                    onChange={(e) => setOptions({ ...options, option1: e.target.value })}
                    required
                />
                <input
                    type="text"
                    value={options.option2}
                    onChange={(e) => setOptions({ ...options, option2: e.target.value })}
                    required
                />
                <input
                    type="text"
                    value={options.option3}
                    onChange={(e) => setOptions({ ...options, option3: e.target.value })}
                    required
                />
                <input
                    type="text"
                    value={options.option4}
                    onChange={(e) => setOptions({ ...options, option4: e.target.value })}
                    required
                />
                <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)} required>
                    <option value="">Select Correct Option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                </select>
                <button className='button' type="submit">Update Question</button>
            </form>
        </div>
    );
};

export default UpdateQuestion;