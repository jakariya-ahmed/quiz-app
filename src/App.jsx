import React from "react";
import Navbar from "./components/Navbar";
import AppRoute from "./routes/AppRoutes";
import { Toaster } from "./components/Toaster";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="">
        <Toaster />
        <AppRoute />
      </main>
    </div>
  );
}
