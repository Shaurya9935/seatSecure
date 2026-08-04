import React from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/Home/HomePage';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import AdminPage from './pages/Admin/AdminPage';
import MoviePage from './pages/movie/MoviePage';
import SeatPage from './pages/Seats/SeatPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/movies/:imdbId" element={<MoviePage />} />
      <Route path="/booking/:showId/seats" element= {<SeatPage/>} />
    </Routes>
  );
}

export default App;
