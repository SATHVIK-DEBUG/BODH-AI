import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BodhLogo } from '../common/BodhLogo';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Documentation', to: '/docs' },
  { label: 'Developers', to: '/developers' },
  { label: 'About', to: '/about' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#080B1A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80'
          : 'bg-white/75 dark:bg-[#080B1A]/75 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand lockup */}
        <Link
          to="/"
          aria-label="Bodh Home"
          className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6366F1] rounded-lg"
        >
          <BodhLogo size="md" showWordmark />
        </Link>

        {/* Zone 2: Clean single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-slate-900 dark:text-[#F8FAFC]'
                    : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F8FAFC]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="bodh-nav-indicator"
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#A855F7]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Single primary action (+ mobile menu trigger on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/login"
            className="hidden md:inline-flex items-center justify-center h-9 px-5 rounded-xl text-sm font-semibold text-white bodh-gradient-btn shadow-[0_6px_20px_-6px_rgba(99,102,241,0.55)] border border-indigo-400/20 whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Login
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-slate-800 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive mobile navigation drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            aria-label="Mobile navigation"
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1024] px-4 py-4 space-y-1.5"
          >
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#6366F1]/12 text-[#6366F1] dark:text-[#F8FAFC]'
                      : 'text-slate-600 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 gap-2.5">
              <Link
                to="/chat"
                className="inline-flex items-center justify-center h-11 rounded-xl text-sm font-semibold text-slate-800 dark:text-[#F8FAFC] bg-slate-100 dark:bg-[#1E293B] whitespace-nowrap"
              >
                Open Chat
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center h-11 rounded-xl text-sm font-semibold text-white bodh-gradient-btn whitespace-nowrap"
              >
                Login
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
