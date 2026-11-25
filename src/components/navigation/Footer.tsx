import React from 'react';
import { Link } from 'react-router-dom';
import { BodhLogo } from '../common/BodhLogo';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#060915]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand summary */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center">
              <BodhLogo size="md" showWordmark />
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8] max-w-sm">
              Don&apos;t just get answers. Gain understanding. An educational AI platform designed
              around conceptual clarity, scientific accuracy, and adaptive logical reasoning.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Frontend platform preview — simulated chat responses and local session state.
            </p>
          </div>

          {/* Product */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-slate-900 dark:text-[#F8FAFC]">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-[#94A3B8]">
              <li>
                <Link to="/" className="hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors">
                  AI Chat Workspace
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors">
                  About Bodh
                </Link>
              </li>
              <li>
                <Link to="/developers" className="hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors">
                  Developers
                </Link>
              </li>
            </ul>
          </div>

          {/* Documentation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-slate-900 dark:text-[#F8FAFC]">
              Documentation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-[#94A3B8]">
              <li>
                <Link
                  to="/docs/introduction"
                  className="hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors"
                >
                  Introduction to Bodh
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/model-philosophy"
                  className="hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors"
                >
                  Model Philosophy
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/misconception-detection"
                  className="hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors"
                >
                  Misconception Detection
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/limitations"
                  className="hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors"
                >
                  Limitations &amp; FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Account screens */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-slate-900 dark:text-[#F8FAFC]">
              Access
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-[#94A3B8]">
              <li>
                <Link to="/login" className="hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/changelog"
                  className="hover:text-[#6366F1] dark:hover:text-[#22D3EE] transition-colors"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} Bodh Educational AI Platform. All rights reserved.</p>
          <p>Built for conceptual clarity and scientific understanding.</p>
        </div>
      </div>
    </footer>
  );
}
