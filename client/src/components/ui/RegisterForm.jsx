import React from "react";
import { PasswordStrengthBar } from "../features/PasswordStrengthBar";
import { AlertMessage } from "../features/AlertMessage";

/**
 * RegisterForm renders input fields, password strength indicator, submit button, and status alerts
 * using the warm orange (#FF6D29) and dark charcoal (#161316 / #453027) theme.
 */
export const RegisterForm = ({
  formData,
  loading,
  message,
  passwordStrength,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Full Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-[0.8rem] font-semibold text-[#BABABA] mb-1.5 tracking-wider uppercase"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="John Doe"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-[#161316]/60 border border-[#453027] rounded-xl px-4 py-3 text-[#FFFFFF] 
                     text-sm outline-none transition-all duration-200 
                     focus:border-[#FF6D29] focus:bg-[#FF6D29]/[0.05] focus:ring-3 focus:ring-[#FF6D29]/20 
                     placeholder:text-[#BABABA]/40"
        />
      </div>

      {/* Email Address Field */}
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
          minLength={6}
          placeholder="Min. 6 characters"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-[#161316]/60 border border-[#453027] rounded-xl px-4 py-3 text-[#FFFFFF] 
                     text-sm outline-none transition-all duration-200 
                     focus:border-[#FF6D29] focus:bg-[#FF6D29]/[0.05] focus:ring-3 focus:ring-[#FF6D29]/20 
                     placeholder:text-[#BABABA]/40"
        />

        {/* Dynamic Password Strength Indicator */}
        <PasswordStrengthBar
          score={passwordStrength.score}
          label={passwordStrength.label}
          color={passwordStrength.color}
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
            <span className="opacity-90">Creating Account...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </button>

      {/* Alert message status feedback */}
      <AlertMessage message={message} />
    </form>
  );
};
