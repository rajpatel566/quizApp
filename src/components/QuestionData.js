// src/components/QuestionData.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuestionData = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/questions/${id}`);
            setQuestions(questions.filter(question => question.id !== id));
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return (
        <div>
            <h2>Question Data</h2>
            <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Option 1</th>
                        <th>Option 2</th>
                        <th>Option 3</th>
                        <th>Option 4</th>
                        <th>Correct Option</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map(question => (
                        <tr key={question.id}>
                            <td>{question.question}</td>
                            <td>{question.option1}</td>
                            <td>{question.option2}</td>
                            <td>{question.option3}</td>
                            <td>{question.option4}</td>
                            <td>{question.correct_option}</td>
                            <td>
                                {/* <Link to={`/update-question/${question.id}`}>Update</Link> */}
                                <Link to={`/update-question/${question.id}`} className="button">Update</Link>
                                {/* <button onClick={() => handleDelete(question.id)}>Delete</button> */}
                                <button onClick={() => handleDelete(question.id)} className="button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/create-question" className="button">Create New Question</Link>
        </div>
        </div>
    );
};

export default QuestionData;