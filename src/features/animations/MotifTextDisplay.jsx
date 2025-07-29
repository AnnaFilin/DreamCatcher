export default function MotifTextDisplay({ motif }) {
  return (
    <div className="flex flex-col items-center justify-center text-center animate-fade-in z-10">
      <h2 className="text-2xl font-marck italic text-white/90 mb-2">
        {motif.id}
      </h2>
      <p className="text-white/70 max-w-md text-sm">{motif.meaning}</p>
      {motif.arch && (
        <p className="text-indigo-300 text-xs mt-2 italic">— {motif.arch}</p>
      )}
    </div>
  );
}
