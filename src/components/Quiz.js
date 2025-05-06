// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

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

    const handleAnswer = (option) => {
        setAttempts(attempts + 1);
        if (option === questions[currentQuestionIndex].correct_option) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    if (quizFinished) {
        return (
            <div>
            <div className="dashboardstyle">
                <h2>Quiz Finished!</h2>
                <p>Your Score: {score}</p>
                <p>Attempts: {attempts}</p>
                <p>Money Won: {score * 10}</p>
            </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return <div>Loading questions...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Create an array of options
    const options = [
        currentQuestion.option1,
        currentQuestion.option2,
        currentQuestion.option3,
        currentQuestion.option4,
    ];

    return (
        <div>
        <div className="dashboardstyle">
            <h2>{currentQuestion.question}</h2>
            <div>
                {options.map((option, index) => (
                    <button className='button' key={index} onClick={() => handleAnswer(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
        </div>
    );
};

export default Quiz;

// // src/components/Quiz.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Quiz = () => {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [score, setScore] = useState(0);
//     const [attempts, setAttempts] = useState(0);
//     const [quizFinished, setQuizFinished] = useState(false);
//     const [showAnswer, setShowAnswer] = useState(false); // State to show correct/incorrect answer

//     useEffect(() => {
//         const fetchQuestions = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/questions');
//                 setQuestions(response.data);
//             } catch (error) {
//                 console.error('Error fetching questions:', error);
//             }
//         };

//         fetchQuestions();
//     }, []);

//     const handleAnswer = (option) => {
//         setAttempts(attempts + 1);
//         setShowAnswer(true); // Show the answer after clicking

//         if (option === questions[currentQuestionIndex].correct_option) {
//             setScore(score + 1);
//             if (currentQuestionIndex < questions.length - 1) {
//                 setTimeout(() => { // Move to next question after a delay
//                     setCurrentQuestionIndex(currentQuestionIndex + 1);
//                     setShowAnswer(false); // Hide the answer for the next question
//                 }, 2000); // 2 second delay
//             } else {
//                 setQuizFinished(true);
//             }
//         } else {
//             // Quiz is over if a wrong answer is selected
//             setQuizFinished(true); 
//         }
//     };

//     if (quizFinished) {
//         return (
//             <div>
//             <div className="dashboardstyle">
//                 <h2>Quiz Finished!</h2>
//                 <p>Your Score: {score}</p>
//                 <p>Attempts: {attempts}</p>
//                 <p>Money Won: ${score * 10}</p>
//             </div>
//             </div>
//         );
//     }

//     if (questions.length === 0) {
//         return <div>Loading questions...</div>;
//     }

//     const currentQuestion = questions[currentQuestionIndex];

//     // Create an array of options
//     const options = [
//         currentQuestion.option1,
//         currentQuestion.option2,
//         currentQuestion.option3,
//         currentQuestion.option4,
//     ];

//     return (
//         <div>
//         <div className="dashboardstyle">
//             <h2>{currentQuestion.question}</h2>
//             <div>
//                 {options.map((option, index) => (
//                     <button key={index} onClick={() => handleAnswer(option)}>
//                         {option}
//                     </button>
//                 ))}
//             </div>
//             {showAnswer && (
//                 <div>
//                     {options.includes(currentQuestion.correct_option) ? (
//                         <p style={{ color: 'green' }}>Correct Answer!</p>
//                     ) : (
//                         <p style={{ color: 'red' }}>Wrong Answer!</p>
//                     )}
//                 </div>
//             )}
//         </div>
//         </div>
//     );
// };

// export default Quiz;