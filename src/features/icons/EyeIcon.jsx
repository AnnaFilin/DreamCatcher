const EyeIcon = ({ active, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} transition-colors duration-300 ${
      active
        ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        : "text-white/70 hover:text-white"
    }`}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" fill={active ? "currentColor" : "none"} />
  </svg>
);

export default EyeIcon;
