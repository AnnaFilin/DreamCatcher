const MotifsList = ({ motifs }) => {
  if (!motifs || motifs.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-12 mt-2 md:mt-4">
      {motifs.map((m) => (
        <span
          key={m}
          className="text-sm font-sans text-white/40 tracking-wider cursor-default drop-shadow-[0_0_6px_rgba(255,255,255,0.25)] [text-shadow:_0_0_8px_rgba(255,255,255,0.15)]"
        >
          {m}
        </span>
      ))}
    </div>
  );
};

export default MotifsList;
