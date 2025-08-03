const InterpretationBlock = ({ interpretation, index }) => {
  if (!interpretation) return null;

  const dateStr = new Date(interpretation.createdAt).toLocaleDateString();

  return (
    <div className="text-white/60 text-sm font-light leading-relaxed space-y-4">
      <div className="flex justify-between text-xs text-white/40 uppercase tracking-wide">
        <span>INTERPRETATION {index + 1}</span>
        <span>{dateStr}</span>
      </div>
      {interpretation.text.split("\n").map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
};

export default InterpretationBlock;
