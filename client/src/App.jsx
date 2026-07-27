import React from 'react';
import { Routes, Route, Link } from 'react-router';
import RegisterPage from './pages/Register/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-[#060818] text-white p-6 space-y-4">
            <h1 className="text-4xl font-extrabold text-cyan-400 font-['Outfit']">
              SeatSecure
            </h1>
            <p className="text-gray-400">Welcome to SeatSecure!</p>
            <div className="flex gap-4">
              <Link
                to="/register"
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                Go to Register Page
              </Link>
            </div>
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-[#060818] text-white p-6 space-y-4">
            <h1 className="text-3xl font-extrabold text-violet-400 font-['Outfit']">
              Sign In
            </h1>
            <p className="text-gray-400">Login page coming soon.</p>
            <Link
              to="/register"
              className="text-cyan-400 font-semibold hover:underline"
            >
              ← Back to Register
            </Link>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
