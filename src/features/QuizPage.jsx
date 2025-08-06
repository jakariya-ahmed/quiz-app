import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Tolstoy", "Hemingway", "Dickens"],
    answer: "Shakespeare",
  },
    {
      question: "What is 2 + 2?",
      options: ["1", "2", "3", "4"],
      answerIndex: 3,
    },
    {
      question: "What color is the sky?",
      options: ["Blue", "Green", "Red", "Yellow"],
      answerIndex: 0,
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      answerIndex: 0,
    },
    {
    question: "What color is the sky?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answerIndex: 0,
  },
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    answerIndex: 0,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answerIndex: 2,
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answerIndex: 1,
  },
  // ... add up to 10 questions here
];

const TIME_PER_QUESTION = 15; // seconds

function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [showResults, setShowResults] = useState(false);
  const timerRef = useRef(null);
  const [resultsSaved, setResultsSaved] = useState(false); // to avoid duplicate saves

  const currentQuestion = QUESTIONS[currentIndex];

  useEffect(() => {
    // Reset timer whenever question changes
    setTimeLeft(TIME_PER_QUESTION);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext(null); // Timeout, no answer selected
          return TIME_PER_QUESTION; // reset timer for next question
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex]);

  const handleAnswerSelect = (option) => {
    handleNext(option);
  };

  const handleNext = (option) => {
    // Save current question answer (null if timed out)
    setSelectedAnswers((prev) => [
      ...prev,
      { question: currentQuestion.question, selected: option, correct: currentQuestion.answer },
    ]);

    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
      clearInterval(timerRef.current);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.filter((ans) => ans.selected === ans.correct).length;
  };

  // Save quiz history on first time results show
  useEffect(() => {
    if (showResults && !resultsSaved) {
      const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
      const newAttempt = {
        date: new Date().toISOString(),
        score: calculateScore(),
        total: QUESTIONS.length,
        answers: selectedAnswers,
      };
      history.push(newAttempt);
      localStorage.setItem("quizHistory", JSON.stringify(history));
      setResultsSaved(true);
    }
  }, [showResults, resultsSaved, selectedAnswers]);

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Quiz Results</h2>
        <p className="text-center mb-4 text-lg">
          Your score:{" "}
          <span className="font-semibold text-green-600">{calculateScore()} / {QUESTIONS.length}</span>
        </p>

        <div className="space-y-4">
          {selectedAnswers.map(({ question, selected, correct }, idx) => (
            <div key={idx} className="p-4 border rounded">
              <p className="font-semibold">{idx + 1}. {question}</p>
              <p>
                Your answer:{" "}
                <span className={selected === correct ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {selected || <em>Not answered</em>}
                </span>
              </p>
              {selected !== correct && (
                <p>Correct answer: <span className="text-green-600 font-semibold">{correct}</span></p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Question {currentIndex + 1} of {QUESTIONS.length}
        </h2>
        <div className="text-gray-600 font-mono">{timeLeft}s</div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-medium">{currentQuestion.question}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerSelect(option)}
            className="w-full text-left p-3 border rounded hover:bg-blue-100 transition"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizPage;
