import { useTranslation } from "react-i18next";

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const AvatarFallback = ({ name }) => {
  const { t } = useTranslation();
  const initials = getInitials(name || t("user.anonymous"));

  return (
    <div className="w-10 h-10 rounded-md bg-white/5 text-white/60 flex items-center justify-center text-2xl font-semibold border border-white/20 shadow-md">
      {initials}
    </div>
  );
};

export default AvatarFallback;
