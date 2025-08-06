import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import QuizPage from "./features/QuizPage";

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-16">
        {!quizStarted ? (
          <Home onStart={() => setQuizStarted(true)} />
        ) : (
          <QuizPage onRestart={() => setQuizStarted(false)} />
        )}
      </main>
    </div>
  );
}
