const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const AvatarFallback = ({ name }) => {
  const initials = getInitials(name || "Anonymous");

  return (
    <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center text-sm font-medium border border-white/20 shadow-sm">
      {initials}
    </div>
  );
};

export default AvatarFallback;
