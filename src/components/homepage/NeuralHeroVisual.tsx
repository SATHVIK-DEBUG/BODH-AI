import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Animated abstract neural & knowledge visual inspired by the approved Bodh hero reference.
 * Uses pure GPU-friendly SVG transforms & opacity, respecting prefers-reduced-motion.
 */
const NEURAL_NODES = [
  { cx: 192, cy: 146, r: 4.5, color: '#22D3EE', delay: 0 },
  { cx: 245, cy: 120, r: 5, color: '#818CF8', delay: 0.3 },
  { cx: 298, cy: 138, r: 4.5, color: '#A855F7', delay: 0.6 },
  { cx: 165, cy: 205, r: 4, color: '#22D3EE', delay: 0.2 },
  { cx: 222, cy: 195, r: 6, color: '#22D3EE', delay: 0.5 },
  { cx: 278, cy: 188, r: 5.5, color: '#6366F1', delay: 0.8 },
  { cx: 332, cy: 208, r: 4.5, color: '#A855F7', delay: 0.4 },
  { cx: 196, cy: 256, r: 4.5, color: '#38BDF8', delay: 0.7 },
  { cx: 254, cy: 248, r: 5.5, color: '#6366F1', delay: 0.1 },
  { cx: 312, cy: 260, r: 4, color: '#C084FC', delay: 0.9 },
  { cx: 230, cy: 300, r: 4, color: '#22D3EE', delay: 0.4 },
  { cx: 276, cy: 296, r: 4, color: '#818CF8', delay: 0.6 },
];

const NEURAL_EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [0, 4],
  [1, 4],
  [1, 5],
  [2, 5],
  [2, 6],
  [3, 4],
  [4, 5],
  [5, 6],
  [3, 7],
  [4, 7],
  [4, 8],
  [5, 8],
  [5, 9],
  [6, 9],
  [7, 8],
  [8, 9],
  [7, 10],
  [8, 10],
  [8, 11],
  [9, 11],
  [10, 11],
];

export function NeuralHeroVisual() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative w-full max-w-[500px] mx-auto aspect-square flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Subtle ambient radial glow anchored behind the neural core */}
      <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.18)_0%,rgba(99,102,241,0.16)_42%,rgba(168,85,247,0.06)_70%,transparent_100%)] blur-2xl pointer-events-none" />

      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full"
      >
        <defs>
          <linearGradient id="bodh-hero-ring" x1="60" y1="360" x2="440" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="bodh-pedestal-grad" x1="130" y1="395" x2="370" y2="395" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="bodh-core-aura" cx="50%" cy="46%" r="36%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#6366F1" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#080B1A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle geometric coordinate circles */}
        <circle cx="250" cy="216" r="168" stroke="#6366F1" strokeOpacity="0.14" strokeDasharray="4 8" />
        <circle cx="250" cy="216" r="126" stroke="#22D3EE" strokeOpacity="0.16" />

        {/* Central luminous field */}
        <circle cx="250" cy="216" r="140" fill="url(#bodh-core-aura)" />

        {/* Pedestal rings inspired by the approved hero visual */}
        <ellipse cx="250" cy="402" rx="124" ry="26" stroke="url(#bodh-pedestal-grad)" strokeWidth="2" />
        <ellipse cx="250" cy="396" rx="92" ry="18" stroke="#22D3EE" strokeOpacity="0.45" strokeWidth="1.5" />
        <ellipse cx="250" cy="392" rx="58" ry="10" fill="#6366F1" fillOpacity="0.14" stroke="#818CF8" strokeOpacity="0.5" />

        {/* Subtle vertical energy beam from pedestal */}
        <path
          d="M196 392L222 292H278L304 392"
          fill="url(#bodh-core-aura)"
          opacity="0.45"
        />

        {/* Orbital knowledge arcs */}
        <motion.g
          style={{ transformOrigin: '250px 216px' }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse
            cx="250"
            cy="216"
            rx="196"
            ry="76"
            transform="rotate(-24 250 216)"
            stroke="url(#bodh-hero-ring)"
            strokeWidth="1.6"
            strokeOpacity="0.72"
          />
          <circle cx="424" cy="144" r="4" fill="#22D3EE" />
          <circle cx="76" cy="288" r="3.5" fill="#A855F7" />
        </motion.g>

        <motion.g
          style={{ transformOrigin: '250px 216px' }}
          animate={reduced ? undefined : { rotate: -360 }}
          transition={{ duration: 58, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse
            cx="250"
            cy="216"
            rx="178"
            ry="66"
            transform="rotate(26 250 216)"
            stroke="url(#bodh-hero-ring)"
            strokeWidth="1.2"
            strokeOpacity="0.45"
            strokeDasharray="6 6"
          />
          <circle cx="406" cy="282" r="3.5" fill="#818CF8" />
        </motion.g>

        {/* Sculpted neural hemisphere silhouette */}
        <motion.g
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Left hemisphere contour */}
          <path
            d="M248 106C205 104 166 130 150 168C136 200 144 242 168 268C186 288 214 306 244 316"
            stroke="#22D3EE"
            strokeOpacity="0.65"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Right hemisphere contour */}
          <path
            d="M254 106C297 104 336 130 352 168C366 200 358 242 334 268C316 288 288 306 258 316"
            stroke="#A855F7"
            strokeOpacity="0.65"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Inner cortical folds */}
          <path
            d="M174 176C198 162 224 166 242 184M168 228C194 218 220 226 240 244M326 176C302 162 276 166 258 184M332 228C306 218 280 226 260 244"
            stroke="#818CF8"
            strokeOpacity="0.42"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Central corpus callosum bridge */}
          <path
            d="M250 118V324"
            stroke="url(#bodh-hero-ring)"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />

          {/* Synaptic knowledge graph edges */}
          {NEURAL_EDGES.map(([fromIdx, toIdx], idx) => {
            const a = NEURAL_NODES[fromIdx];
            const b = NEURAL_NODES[toIdx];
            return (
              <line
                key={idx}
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
                stroke="url(#bodh-hero-ring)"
                strokeWidth="1.3"
                strokeOpacity="0.52"
              />
            );
          })}

          {/* Synaptic nodes */}
          {NEURAL_NODES.map((node, idx) => (
            <g key={idx}>
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={node.r + 5}
                fill={node.color}
                initial={{ opacity: 0.14 }}
                animate={reduced ? undefined : { opacity: [0.1, 0.34, 0.1] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  delay: node.delay,
                  ease: 'easeInOut',
                }}
              />
              <circle cx={node.cx} cy={node.cy} r={node.r} fill={node.color} />
              <circle cx={node.cx} cy={node.cy} r={node.r * 0.42} fill="#F8FAFC" />
            </g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
