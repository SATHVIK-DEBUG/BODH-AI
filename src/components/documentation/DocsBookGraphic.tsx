import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Luminous wireframe open-book and orbital arc visual matching the Bodh Documentation reference sheet.
 */
export function DocsBookGraphic() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/90 bg-gradient-to-br from-[#0B1126] via-[#0E1633] to-[#131336] flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(34,211,238,0.16),rgba(99,102,241,0.14)_45%,transparent_72%)]" />
      <svg viewBox="0 0 420 200" fill="none" className="relative z-10 w-full max-w-md h-full">
        <defs>
          <linearGradient id="doc-book-grad" x1="80" y1="40" x2="340" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>

        {/* Orbital sweep */}
        <motion.ellipse
          cx="210"
          cy="112"
          rx="156"
          ry="44"
          transform="rotate(-12 210 112)"
          stroke="url(#doc-book-grad)"
          strokeWidth="1.8"
          strokeOpacity="0.8"
          animate={reduced ? undefined : { opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Open book left and right pages */}
        <g stroke="url(#doc-book-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Left page */}
          <path d="M210 66C184 52 146 52 122 64V142C146 130 184 130 210 144V66Z" fill="#22D3EE" fillOpacity="0.08" />
          {/* Right page */}
          <path d="M210 66C236 52 274 52 298 64V142C274 130 236 130 210 144V66Z" fill="#6366F1" fillOpacity="0.09" />
          {/* Outer stacked pages */}
          <path d="M114 72V150C142 138 182 138 210 152C238 138 278 138 306 150V72" strokeOpacity="0.55" />
          {/* Subtle text lines inside pages */}
          <path d="M142 84C160 79 180 80 194 86" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d="M142 102C160 97 180 98 194 104" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d="M142 120C160 115 180 116 194 122" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M226 86C240 80 260 79 278 84" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d="M226 104C240 98 260 97 278 102" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d="M226 122C240 116 260 115 278 120" strokeOpacity="0.4" strokeWidth="1.5" />
        </g>

        {/* Orbital star accent */}
        <path
          d="M346 66L348 72L354 74L348 76L346 82L344 76L338 74L344 72L346 66Z"
          fill="#E0F2FE"
        />
      </svg>
    </div>
  );
}
