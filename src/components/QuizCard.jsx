// src/components/QuizCard.jsx

function QuizCard({ title }) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white hover:bg-gray-100 transition">
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}

export default QuizCard;
