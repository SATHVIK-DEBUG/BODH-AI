import React, { useId } from 'react';

interface BodhLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  layout?: 'horizontal' | 'stacked';
  className?: string;
}

const ICON_SIZES = {
  sm: 28,
  md: 34,
  lg: 48,
  xl: 68,
};

const WORDMARK_CLASSES = {
  sm: 'text-base font-bold tracking-tight',
  md: 'text-lg font-bold tracking-tight',
  lg: 'text-2xl font-bold tracking-tight',
  xl: 'text-3xl font-extrabold tracking-tight',
};

export function BodhLogo({
  size = 'md',
  showWordmark = true,
  layout = 'horizontal',
  className = '',
}: BodhLogoProps) {
  const uid = useId().replace(/:/g, '');
  const iconPx = ICON_SIZES[size];

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap shrink-0 ${
        layout === 'stacked' ? 'flex-col gap-2.5' : 'flex-row gap-2.5'
      } ${className}`}
    >
      <svg
        width={iconPx}
        height={iconPx}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id={`bodh-main-${uid}`} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <linearGradient id={`bodh-orbit-${uid}`} x1="4" y1="48" x2="60" y2="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="55%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#E9D5FF" />
          </linearGradient>
        </defs>

        {/* Stylized B vertical spine and upper/lower bowls */}
        <path
          d="M17 12H35.5C43.5 12 48.5 16.2 48.5 22.4C48.5 26.8 45.8 29.8 41.8 31.1C46.9 32.3 50.2 36.1 50.2 41.4C50.2 48.4 44.3 52.5 35.6 52.5H18.5"
          stroke={`url(#bodh-main-${uid})`}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 12V36"
          stroke={`url(#bodh-main-${uid})`}
          strokeWidth="6.5"
          strokeLinecap="round"
        />

        {/* Open book pages curve nested inside lower B */}
        <path
          d="M12.5 47.5C18.5 44.2 25.2 44.8 30.8 49.2C35.2 44.8 40.8 44.2 46.2 46.2"
          stroke={`url(#bodh-orbit-${uid})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 41.5C21 38.8 26.5 39.4 30.8 43.2C34.8 39.6 39.5 39 44 40.6"
          stroke="#22D3EE"
          strokeOpacity="0.85"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Orbital sweep ring */}
        <path
          d="M7.5 49.5C5.2 42.5 16.5 31.8 33.8 24.4C48.5 18.1 58.6 15.8 59.5 19.6C60.4 23.4 51.4 32.6 35.6 40.8"
          stroke={`url(#bodh-orbit-${uid})`}
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* 4-point knowledge star at orbital apex */}
        <path
          d="M52.5 6.5L53.8 10.7L58 12L53.8 13.3L52.5 17.5L51.2 13.3L47 12L51.2 10.7L52.5 6.5Z"
          fill="#E0F2FE"
        />
      </svg>

      {showWordmark && (
        <span className={`${WORDMARK_CLASSES[size]} text-slate-900 dark:text-[#F8FAFC]`}>
          Bodh
        </span>
      )}
    </span>
  );
}
