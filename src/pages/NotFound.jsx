// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-4">
      <h1 className="text-9xl font-extrabold mb-6">404</h1>
      <p className="text-2xl md:text-3xl mb-6">Oops! Page Not Found</p>
      <p className="mb-8 max-w-md text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded shadow hover:bg-gray-100 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
