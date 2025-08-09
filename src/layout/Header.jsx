import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useContext, useState } from "react";
import {
  themeFonts,
  themeColors,
  themeEffects,
  themeSpacing,
} from "../utils/themeTokens";
import LoginButton from "../features/auth/LoginButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { DreamContext } from "../contexts/DreamContext";
import AvatarFallback from "./AvatarFallback";

const CANONICAL_ORIGIN =
  import.meta.env.VITE_PUBLIC_BASE_URL || "https://www.dreamcatcherlog.app";

const Header = () => {
  const [user] = useAuthState(auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isFakeGoogleAvatar = user?.photoURL?.includes("googleusercontent.com");

  const { isModalOpen, setIsModalOpen } = useContext(DreamContext);
  const isMobile = useMediaQuery("(max-width: 639px)");
  const location = useLocation();

  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } finally {
      window.location.assign(`${CANONICAL_ORIGIN}`);
    }
  };

  return (
    <header
      className="
    fixed top-0 left-0 w-full
    px-4 sm:px-5 md:px-6 lg:px-8 py-4 md:py-6
    border-b border-white/20
    backdrop-blur-md
    bg-black/30
    shadow-[0_1px_3px_rgba(255,255,255,0.05)]
    z-100
  "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <NavLink
          to={user ? "/" : "/welcome"}
          className={themeFonts.logo}
          onClick={(e) => {
            setMenuOpen(false);

            if (location.pathname === "/" && isModalOpen && isMobile) {
              e.preventDefault();
              setIsModalOpen(false);
            }
          }}
        >
          Dream Catcher
        </NavLink>

        <div className="hidden lg:flex items-center gap-5">
          <nav className="flex gap-5 text-xs tracking-wider uppercase font-sans text-white/80">
            {user && (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `
                  uppercase text-xs tracking-widest transition
                  ${
                    isActive
                      ? "text-white underline underline-offset-4"
                      : "text-white/70 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
                  }
                  `
                }
              >
                {t("nav.home")}
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/archive"
                className={({ isActive }) =>
                  `
                  uppercase text-xs tracking-widest transition
                  ${
                    isActive
                      ? "text-white underline underline-offset-4"
                      : "text-white/70 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
                  }
                `
                }
              >
                {t("nav.archive")}
              </NavLink>
            )}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `
                uppercase text-xs tracking-widest transition
                ${
                  isActive
                    ? "text-white underline underline-offset-4"
                    : "text-white/70 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
                }
              `
              }
            >
              {t("nav.about")}
            </NavLink>
          </nav>
          <div className="ml-6">
            <LanguageSwitcher />
          </div>

          {!user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/register")}
                className="
    uppercase text-xs tracking-widest transition
    text-white/70 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]
  "
              >
                {t("buttons.sign_up")}
              </button>

              <LoginButton />
            </div>
          ) : (
            <div className="flex items-center ">
              <button
                onClick={handleSignOut}
                className={`
                  ${themeFonts.tag}
                  ${themeSpacing.button}
                  ${themeEffects.button.base}
                  ${themeEffects.button.hover}
                  ${themeEffects.button.active}
                  ${themeColors.glowSoft}
                  `}
              >
                {t("buttons.sign_out")}
              </button>

              {user?.photoURL && !isFakeGoogleAvatar ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
              ) : (
                <AvatarFallback name={user.displayName || user.email || "U"} />
              )}
            </div>
          )}
        </div>

        <button
          className="lg:hidden text-white/50 hover:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden mt-4 px-4 flex flex-col items-center gap-4 text-white/60 uppercase tracking-wider text-sm">
          {user && (
            <NavLink
              to="/"
              className="hover:text-white transition"
              onClick={(e) => {
                setMenuOpen(false);
                if (location.pathname === "/" && isModalOpen && isMobile) {
                  e.preventDefault();
                  setIsModalOpen(false);
                }
              }}
            >
              {t("nav.home")}
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/archive"
              className="hover:text-white transition"
              onClick={(e) => {
                setMenuOpen(false);
                if (isModalOpen && isMobile) {
                  e.preventDefault();
                  setIsModalOpen(false);
                  navigate("/archive");
                }
              }}
            >
              {t("nav.archive")}
            </NavLink>
          )}
          <NavLink
            to="/about"
            className="hover:text-white transition"
            onClick={(e) => {
              setMenuOpen(false);
              if (isModalOpen && isMobile) {
                e.preventDefault();
                setIsModalOpen(false);
                navigate("/about");
              }
            }}
          >
            {t("nav.about")}
          </NavLink>

          {user && (
            <button
              onClick={() => {
                handleSignOut();
                setMenuOpen(false);
              }}
              className="text-white/60 hover:text-white transition text-sm tracking-wider uppercase"
            >
              {t("buttons.sign_out")}
            </button>
          )}
          <button
            onClick={() => {
              toggleLanguage();
              setMenuOpen(false);
            }}
            className="text-white/60 hover:text-white transition text-sm tracking-wider uppercase"
          >
            {i18n.language === "en" ? "RU" : "EN"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
