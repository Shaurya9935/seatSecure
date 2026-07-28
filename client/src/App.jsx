import React from 'react';
import { Routes, Route, Link } from 'react-router';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-[#161316] text-white p-6 space-y-4">
            <h1 className="text-4xl font-extrabold text-[#FF6D29] font-['Outfit']">
              SeatSecure
            </h1>
            <p className="text-[#BABABA]">Welcome to SeatSecure!</p>
            <div className="flex gap-4">
              <Link
                to="/register"
                className="px-5 py-2.5 bg-gradient-to-r from-[#FF6D29] to-[#D9531E] rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                Go to Register Page
              </Link>
              <Link
                to="/login"
                className="px-5 py-2.5 border border-[#453027] bg-[#453027]/30 text-white rounded-xl font-bold hover:bg-[#453027]/60 transition-colors"
              >
                Go to Login Page
              </Link>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
