export default function MotifTextDisplay({ motif }) {
  return (
    <div className="flex flex-col items-center justify-center text-center z-10 animate-fade-in px-4 sm:px-6 max-w-xl">
      <h2 className="text-lg sm:text-xl font-sora text-white/80 mb-3 tracking-tight">
        {motif.id}
      </h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed">
        {motif.meaning}
      </p>
      {motif.arch && (
        <p className="text-xs text-white/30 mt-3 uppercase tracking-widest">
          {motif.arch}
        </p>
      )}
    </div>
  );
}
