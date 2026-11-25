import React from 'react';

/**
 * Flowing blue-to-purple harmonic wave mesh inspired by the Bodh Login/Signup reference panel.
 */
export function AuthWaveVisual() {
  return (
    <svg
      viewBox="0 0 600 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-auto pointer-events-none select-none"
    >
      <defs>
        <linearGradient id="auth-wave-1" x1="0" y1="160" x2="600" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#6366F1" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="auth-wave-2" x1="0" y1="220" x2="600" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#818CF8" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {Array.from({ length: 12 }).map((_, i) => {
        const offset = i * 9;
        return (
          <path
            key={i}
            d={`M-20 ${125 + offset} C 140 ${45 + offset * 0.8}, 270 ${275 - offset * 0.6}, 430 ${150 + offset * 0.7} C 500 ${96 + offset * 0.5}, 560 ${130 + offset}, 620 ${105 + offset}`}
            stroke={i % 2 === 0 ? 'url(#auth-wave-1)' : 'url(#auth-wave-2)'}
            strokeWidth={i === 4 ? '1.8' : '1.1'}
            strokeOpacity={0.18 + i * 0.045}
          />
        );
      })}
    </svg>
  );
}
