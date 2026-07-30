import React, { useState } from 'react';
import { Link } from 'react-router';

/**
 * Footer Component for SeatSecure
 * Features:
 * - Brand section with glowing logo & mission statement
 * - Quick links, account links, legal resources
 * - Newsletter email signup form with feedback alert
 * - Social media links and copyright notice
 * - Styled using #161316 background, #453027 borders, and #FF6D29 accents
 */
const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="w-full bg-[#161316] border-t border-[#453027]/60 text-[#BABABA] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#453027]/60">
          
          {/* Brand Info (Spans 2 cols on lg screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6D29] to-[#453027] 
                              flex items-center justify-center text-xl shadow-[0_0_20px_rgba(255,109,41,0.35)]">
                🎬
              </div>
              <span className="font-['Outfit'] font-extrabold text-2xl bg-gradient-to-r from-[#FF6D29] via-[#FF8A50] to-[#FFFFFF] bg-clip-text text-transparent">
                SeatSecure
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-[#BABABA]">
              Interactive real-time seat booking platform. Choose your favorite movie seats with instant confirmation and seamless ticketing.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { name: 'X / Twitter', icon: '𝕏', href: '#' },
                { name: 'GitHub', icon: '🐙', href: '#' },
                { name: 'Discord', icon: '💬', href: '#' },
                { name: 'Instagram', icon: '📷', href: '#' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg bg-[#161316] border border-[#453027] flex items-center justify-center 
                             hover:border-[#FF6D29] hover:text-[#FF6D29] transition-colors duration-200 text-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h3 className="font-['Outfit'] font-bold text-white text-base">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#FF6D29] transition-colors">Movies</Link>
              </li>
              <li>
                <Link to="/#theatres" className="hover:text-[#FF6D29] transition-colors">Theatres</Link>
              </li>
              <li>
                <Link to="/#offers" className="hover:text-[#FF6D29] transition-colors">Special Offers</Link>
              </li>
              <li>
                <Link to="/#upcoming" className="hover:text-[#FF6D29] transition-colors">Upcoming Releases</Link>
              </li>
            </ul>
          </div>

          {/* Account Column */}
          <div className="space-y-3">
            <h3 className="font-['Outfit'] font-bold text-white text-base">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-[#FF6D29] transition-colors">Sign In</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#FF6D29] transition-colors">Create Account</Link>
              </li>
              <li>
                <Link to="/#bookings" className="hover:text-[#FF6D29] transition-colors">My Bookings</Link>
              </li>
              <li>
                <Link to="/#support" className="hover:text-[#FF6D29] transition-colors">Customer Support</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h3 className="font-['Outfit'] font-bold text-white text-base">Stay Updated</h3>
            <p className="text-xs text-[#BABABA]">
              Subscribe to get exclusive movie deals & early ticket updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161316] border border-[#453027] rounded-xl px-3.5 py-2.5 text-xs text-white 
                             outline-none focus:border-[#FF6D29] focus:ring-1 focus:ring-[#FF6D29] transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-[#FF6D29] to-[#D9531E] 
                           hover:shadow-[0_4px_16px_rgba(255,109,41,0.35)] transition-all"
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-400 font-medium animate-fade-in">
                ✓ Thanks for subscribing!
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#BABABA] gap-4">
          <p>© {new Date().getFullYear()} SeatSecure Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#FFFFFF] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FFFFFF] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#FFFFFF] transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
export { Footer };