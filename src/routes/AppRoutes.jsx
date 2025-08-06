// src/AppRoute.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import QuizPage from "../features/QuizPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound"; // optional 404 page
import Profile from "../pages/Profile";


export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/profile" element={<Profile />} />
      {/* Redirect unknown paths to home or 404 */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
