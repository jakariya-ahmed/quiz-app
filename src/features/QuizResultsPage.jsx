import { useLocation, useNavigate } from "react-router-dom";

function QuizResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { quiz, selectedAnswers } = location.state || {};

  if (!quiz || !selectedAnswers) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">No results to show</h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Go to Quizzes
        </button>
      </div>
    );
  }

  let score = 0;
  quiz.questions.slice(0, 10).forEach((q, i) => {
    if (selectedAnswers[i] === q.answerIndex) score++;
  });

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
      <p className="mb-4">
        You scored {score} out of 10
      </p>

      <div>
        {quiz.questions.slice(0, 10).map((q, i) => {
          const userAnswer = selectedAnswers[i];
          const correctAnswer = q.answerIndex;
          return (
            <div key={i} className="mb-6 border p-4 rounded">
              <p className="font-semibold">
                Q{i + 1}: {q.question}
              </p>
              <p>
                Your answer:{" "}
                <span
                  className={
                    userAnswer === correctAnswer
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {q.options[userAnswer] || "No answer"}
                </span>
              </p>
              {userAnswer !== correctAnswer && (
                <p>
                  Correct answer:{" "}
                  <span className="text-green-600">{q.options[correctAnswer]}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/")}
      >
        Back to Quizzes
      </button>
    </div>
  );
}

export default QuizResultsPage;
