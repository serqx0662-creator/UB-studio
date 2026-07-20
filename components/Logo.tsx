export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ub-logo-grad" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#eef4f8" />
          <stop offset="55%" stopColor="#b2d5e5" />
          <stop offset="100%" stopColor="#5c92b8" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" stroke="url(#ub-logo-grad)" strokeWidth="1.2" opacity="0.5" />
      <path
        d="M12 12v9.5a8 8 0 0 0 16 0V12"
        stroke="url(#ub-logo-grad)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="28.5" cy="12" r="2.1" fill="#b2d5e5" />
    </svg>
  );
}
