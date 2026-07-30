import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';

/**
 * Navbar Component for SeatSecure
 * Features:
 * - Glassmorphic sticky header with backdrop blur
 * - Brand logo with gradient title
 * - Active route link highlights using React Router's useLocation
 * - Mobile hamburger menu toggle drawer
 * - Sign In & Register CTA buttons matching the #FF6D29 theme
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/#movies' },
    { name: 'Bookings', path: '/#bookings' },
    { name: 'Offers', path: '/#offers' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#161316]/80 backdrop-blur-xl border-b border-[#453027]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6D29] to-[#453027] 
                            flex items-center justify-center text-xl shadow-[0_0_20px_rgba(255,109,41,0.35)] 
                            group-hover:scale-105 transition-transform duration-300">
              🎬
            </div>
            <span className="font-['Outfit'] font-extrabold text-2xl bg-gradient-to-r from-[#FF6D29] via-[#FF8A50] to-[#FFFFFF] bg-clip-text text-transparent">
              SeatSecure
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-[#FF6D29]'
                    : 'text-[#BABABA] hover:text-[#FFFFFF]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions (Sign In / Register) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-semibold text-[#BABABA] hover:text-[#FFFFFF] transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-[#FF6D29] to-[#D9531E] 
                         shadow-[0_4px_20px_rgba(255,109,41,0.3)] hover:shadow-[0_8px_28px_rgba(255,109,41,0.45)] 
                         hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Book Seats
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl border border-[#453027] text-[#BABABA] hover:text-white hover:border-[#FF6D29] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#161316]/95 border-b border-[#453027] px-4 pt-4 pb-6 space-y-3 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-[#FF6D29]/10 text-[#FF6D29] font-bold'
                  : 'text-[#BABABA] hover:bg-[#453027]/40 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#453027]/60 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-semibold text-[#BABABA] hover:text-white border border-[#453027] rounded-xl"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-bold text-white bg-gradient-to-r from-[#FF6D29] to-[#D9531E] rounded-xl shadow-[0_4px_20px_rgba(255,109,41,0.3)]"
            >
              Book Seats
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
export { Navbar };