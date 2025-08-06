import { useEffect, useState } from "react";

function ProfilePage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(savedHistory);
  }, []);

  if (history.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-semibold mb-4">No quiz history available.</h2>
        <p>Take some quizzes to see your progress here!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Your Quiz History</h2>
      <div className="space-y-6">
        {history.map((attempt, index) => (
          <div key={index} className="border rounded p-4">
            <p className="font-semibold mb-1">Attempt #{index + 1}</p>
            <p>Date: {new Date(attempt.date).toLocaleString()}</p>
            <p>
              Score: <span className="font-semibold text-green-600">{attempt.score}</span> / {attempt.total}
            </p>
            <details className="mt-2">
              <summary className="cursor-pointer font-medium text-blue-600">View Answers</summary>
              <ul className="list-disc list-inside mt-2">
                {attempt.answers.map((ans, i) => (
                  <li key={i}>
                    <strong>Q{i + 1}:</strong> {ans.question} <br />
                    Your answer:{" "}
                    <span className={ans.selected === ans.correct ? "text-green-600" : "text-red-600"}>
                      {ans.selected || "Not answered"}
                    </span>
                    {ans.selected !== ans.correct && (
                      <>
                        <br />
                        Correct answer: <span className="text-green-600">{ans.correct}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
