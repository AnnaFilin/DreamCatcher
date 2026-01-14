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
    <div className="relative flex flex-1 items-center justify-center text-white px-6 text-center">
      <div className="absolute inset-0 z-0">
        <FloatingPublicMotifs setSelectedMotif={setSelectedMotif} />
      </div>

      {selectedMotif ? (
        <div className="z-20">
          <MotifTextDisplay motif={selectedMotif} />
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 px-6 text-center w-full sm:w-auto">
          <h1 className="text-4xl text-white/60  font-light mb-4">
            {t("welcome.title")}
          </h1>
          <p className="text-white/60 max-w-full sm:max-w-md mx-auto">
            {t("welcome.description")}
          </p>

          <div className="mt-6 w-full max-w-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-white/70">
            <NavLink
              to="/register"
              className="uppercase text-xs tracking-widest hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
            >
              {t("welcome.signup")}
            </NavLink>

            <p className="text-center sm:text-left text-white/60">
              {t("welcome.already")}
            </p>

            <div className="flex justify-center sm:justify-end">
              <LoginButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
