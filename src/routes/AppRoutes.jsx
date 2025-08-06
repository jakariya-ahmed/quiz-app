import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import QuizList from "../features/QuizList";
import QuizPage from "../features/QuizPage";
import QuizResultsPage from "../features/QuizResultsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quizzes" element={<QuizList />} />
      <Route path="/quiz/:id" element={<QuizPage />}/>
      <Route path="/results" element={<QuizResultsPage />} />
    </Routes>
  );
}
