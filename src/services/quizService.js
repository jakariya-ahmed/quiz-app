// src/services/quizService.js

// Fetch quizzes from The Trivia API
export async function fetchQuizzesFromApi() {
  try {
    const response = await fetch(
      "https://the-trivia-api.com/api/questions?limit=5&difficulty=easy"
    );
    if (!response.ok) throw new Error("API error");
    const data = await response.json();

    // Convert API response to our quiz format
    const quizzes = data.map((item, index) => {
      const options = [...item.incorrectAnswers, item.correctAnswer];
      // Shuffle options array
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      return {
        id: `quiz${index}`,
        title: "Trivia Quiz",
        questions: [
          {
            question: item.question,
            options,
            answerIndex: options.findIndex(opt => opt === item.correctAnswer),
          },
        ],
      };
    });

    // Cache quizzes in localStorage (optional)
    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    return quizzes;
  } catch (error) {
    console.error("Fetch quizzes failed:", error);
    throw error;
  }
}

// Get quiz by ID from localStorage
export function getQuizById(id) {
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  return quizzes.find((q) => q.id === id) || null;
}

// Add a new quiz to localStorage
export function addQuiz(quiz) {
  const existing = JSON.parse(localStorage.getItem("quizzes")) || [];
  const updated = [...existing, quiz];
  localStorage.setItem("quizzes", JSON.stringify(updated));
}
