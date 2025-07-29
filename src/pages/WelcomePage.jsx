import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginButton from "../features/auth/LoginButton";
import FloatingPublicMotifs from "../features/animations/FloatingMotifCloud";
import MotifTextDisplay from "../features/animations/MotifTextDisplay";
import { useTranslation } from "react-i18next";

const WelcomePage = () => {
  const { t } = useTranslation();

  const user = useSelector((state) => state.user);
  const [selectedMotif, setSelectedMotif] = useState(null);

  if (user?.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-white px-6 text-center">
      <FloatingPublicMotifs setSelectedMotif={setSelectedMotif} />

      {selectedMotif ? (
        <MotifTextDisplay motif={selectedMotif} />
      ) : (
        <>
          <h1 className="text-4xl font-sora font-light mb-4">
            {t("welcome.title")}
          </h1>
          <p className="text-white/60 max-w-md">{t("welcome.description")}</p>
          <div className="mt-6 flex items-baseline gap-6">
            <NavLink
              to="/register"
              className=" uppercase text-xs tracking-widest transition 
          text-white/70 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
            >
              {t("welcome.signup")}
            </NavLink>
            <p className="text-sm text-white/60 ">{t("welcome.already")}</p>
            <LoginButton />
          </div>
        </>
      )}
    </div>
  );
};

export default WelcomePage;
