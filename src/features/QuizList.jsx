import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchQuizzesFromApi, getQuizById } from "../services/quizService";

function QuizzesListPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzesFromApi()
      .then((data) => setQuizzes(data))
      .catch(() => {
        // fallback localStorage quizzes
        const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        setQuizzes(storedQuizzes);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading quizzes...</p>;
  if (quizzes.length === 0) return <p className="text-center mt-10">No quizzes found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Available Quizzes</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="mb-4">
            <Link
              to={`/quiz/${quiz.id}`}
              className="text-blue-600 hover:underline"
            >
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizzesListPage;
