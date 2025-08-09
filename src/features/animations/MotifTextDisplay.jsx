export default function MotifTextDisplay({ motif }) {
  const formatTitle = (text) =>
    text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const capitalizeFirst = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  return (
    <div
      className="
      flex flex-col items-center justify-center text-center
      px-4 sm:px-6 pointer-events-none
      max-w-xl w-full
      min-h-[theme(spacing.80)]
      animate-fade-in
      transition-all duration-500 ease-in-out
    "
    >
      <h2 className="text-4xl  font-light text-white/60 mb-4 tracking-tight">
        {formatTitle(motif.id)}
      </h2>

      <p className="text-base text-white/60 leading-relaxed">
        {capitalizeFirst(motif.meaning)}
      </p>

      {motif.arch && (
        <p className="text-xs text-white/30 mt-3 uppercase tracking-widest">
          {motif.arch}
        </p>
      )}
    </div>
  );
}
