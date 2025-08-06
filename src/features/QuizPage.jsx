import React, { useState } from "react";

const quiz = {
  title: "Sample Quiz",
  questions: [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Paris", "Rome", "Madrid"],
      answerIndex: 1,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
      answerIndex: 2,
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Shakespeare", "Tolkien", "Dickens", "Austen"],
      answerIndex: 0,
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answerIndex: 1,
    },
    {
      question: "Which ocean is the largest?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      answerIndex: 3,
    },
  ],
};

export default function QuizPage({ onRestart }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleOptionSelect = (index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(currentQuestion + 1); // show results
    }
  };

  if (currentQuestion >= quiz.questions.length) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>
        {quiz.questions.map((q, i) => {
          const userAnswer = selectedAnswers[i];
          const correctAnswer = q.answerIndex;
          const isCorrect = userAnswer === correctAnswer;
          return (
            <div key={i} className="mb-4 border-b pb-3">
              <p className="font-semibold">{q.question}</p>
              <p>
                Your answer:{" "}
                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                  {userAnswer !== undefined ? q.options[userAnswer] : "No answer selected"}
                </span>
              </p>
              {!isCorrect && (
                <p className="text-green-600">
                  Correct answer: {q.options[correctAnswer]}
                </p>
              )}
            </div>
          );
        })}
        <button
          onClick={onRestart}
          className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
      <p className="mb-4">{question.question}</p>
      <div className="flex flex-col gap-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionSelect(idx)}
            className="p-3 border rounded hover:bg-blue-100 text-left transition"
          >
            {option}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Question {currentQuestion + 1} of {quiz.questions.length}
      </p>
    </div>
  );
}
