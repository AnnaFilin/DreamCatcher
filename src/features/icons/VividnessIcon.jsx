const VividnessIcon = ({ level, active }) => {
  const baseClass = "w-6 h-6 transition-colors duration-300";
  const commonProps = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    fill: "none",
  };

  if (level === "Low") {
    return (
      <svg
        {...commonProps}
        viewBox="0 0 24 24"
        className={`${baseClass} ${
          active
            ? "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
            : "text-white/50 hover:text-white"
        }`}
      >
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  }

  if (level === "Medium") {
    return (
      <svg
        {...commonProps}
        viewBox="0 0 24 24"
        className={`${baseClass} ${
          active
            ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            : "text-white/60 hover:text-white"
        }`}
      >
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="5" />
      </svg>
    );
  }

  if (level === "High") {
    return (
      <svg
        {...commonProps}
        viewBox="0 0 24 24"
        className={`${baseClass} ${
          active
            ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
            : "text-white/80"
        }`}
      >
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  }

  return null;
};

export default VividnessIcon;
