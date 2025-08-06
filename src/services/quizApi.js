// src/services/quizApi.js

const STORAGE_KEY = "quizzes";

export async function getQuizzes() {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
    if (!response.ok) throw new Error("API error");

    const data = await response.json();

    // transform data if needed
    // For example, map OpenTDB format to your quiz format

    // Save to localStorage for fallback
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.results));

    return data.results;
  } catch (error) {
    // fallback to localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
}

export function getQuizById(id) {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  const quizzes = JSON.parse(stored);
  return quizzes.find((q) => q.id === id) || null;
}
