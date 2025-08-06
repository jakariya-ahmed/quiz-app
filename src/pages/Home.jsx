import React from "react";

export default function HomePage({ onStart }) {
  return (
    <div
      id="home"
      className="h-screen relative flex items-center justify-center text-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,25,47,0.75), rgba(10,25,47,0.75)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md p-6 rounded bg-black bg-opacity-30">
        <h1 className="text-4xl font-extrabold mb-6">Let's Start</h1>
        <button
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded text-lg font-semibold"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
