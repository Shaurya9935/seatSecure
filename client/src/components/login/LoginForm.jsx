import React from "react";
import { AlertMessage } from "../features/AlertMessage";

export const LoginForm = ({
  formData,
  loading,
  message,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-[0.8rem] font-semibold text-[#BABABA] mb-1.5 tracking-wider uppercase"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-[#161316]/60 border border-[#453027] rounded-xl px-4 py-3 text-[#FFFFFF] 
                     text-sm outline-none transition-all duration-200 
                     focus:border-[#FF6D29] focus:bg-[#FF6D29]/[0.05] focus:ring-3 focus:ring-[#FF6D29]/20 
                     placeholder:text-[#BABABA]/40"
        />
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-[0.8rem] font-semibold text-[#BABABA] mb-1.5 tracking-wider uppercase"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-[#161316]/60 border border-[#453027] rounded-xl px-4 py-3 text-[#FFFFFF] 
                     text-sm outline-none transition-all duration-200 
                     focus:border-[#FF6D29] focus:bg-[#FF6D29]/[0.05] focus:ring-3 focus:ring-[#FF6D29]/20 
                     placeholder:text-[#BABABA]/40"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-4 mt-2 bg-gradient-to-r from-[#FF6D29] to-[#D9531E] 
                   text-[#FFFFFF] font-bold rounded-xl text-base cursor-pointer 
                   transition-all duration-200 hover:-translate-y-0.5 
                   shadow-[0_4px_20px_rgba(255,109,41,0.3)] hover:shadow-[0_8px_28px_rgba(255,109,41,0.45)] 
                   active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none 
                   flex items-center justify-center gap-2 relative overflow-hidden"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="opacity-90">Signing in...</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </button>

      {/* Alert status feedback */}
      <AlertMessage message={message} />
    </form>
  );
};

export default LoginForm;
