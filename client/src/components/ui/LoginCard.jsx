import React from 'react';
import { Link } from 'react-router';
import { LoginForm } from './LoginForm';

/**
 * LoginCard renders the glassmorphic login card styled with the warm orange & charcoal palette.
 */
export const LoginCard = ({
  formData,
  loading,
  message,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="relative z-10 w-full max-w-[440px] p-5">
      <div className="bg-[#161316]/85 border border-[#453027]/70 rounded-3xl p-8 sm:p-[44px_40px] 
                      backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
        
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6D29] to-[#453027] 
                          flex items-center justify-center text-xl shadow-[0_0_24px_rgba(255,109,41,0.35)]">
            🎬
          </div>
          <span className="font-['Outfit'] font-extrabold text-2xl bg-gradient-to-r from-[#FF6D29] via-[#FF8A50] to-[#FFFFFF] bg-clip-text text-transparent">
            SeatSecure
          </span>
        </div>

        {/* Form Title & Subtitle */}
        <h1 className="font-['Outfit'] font-extrabold text-3xl text-[#FFFFFF] mb-1.5 text-center sm:text-left">
          Welcome back
        </h1>
        <p className="text-[#BABABA] text-sm mb-8 text-center sm:text-left">
          Sign in to your account to start booking seats.
        </p>

        {/* Login Form */}
        <LoginForm
          formData={formData}
          loading={loading}
          message={message}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <hr className="border-none border-t border-[#453027]/60 my-6" />

        {/* Footer Navigation Links */}
        <div className="text-center text-sm text-[#BABABA] space-y-2">
          <p>
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-[#FF6D29] font-semibold hover:text-[#FFFFFF] hover:underline transition-colors duration-150"
            >
              Create Account
            </Link>
          </p>
          <p>
            <Link
              to="/"
              className="text-[#BABABA] text-xs hover:text-[#FFFFFF] transition-colors duration-150"
            >
              ← Back to Movies
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
