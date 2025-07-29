import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import {
  themeFonts,
  themeColors,
  themeEffects,
  themeSpacing,
} from "../utils/themeTokens";
import LoginButton from "../features/auth/LoginButton";

const Header = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleSignOut = async () => {
    await signOut(auth);

    if (!import.meta.env.VITE_IS_PROD) {
      navigate("/welcome");
    } else {
      window.location.href = "/welcome";
    }
  };

  return (
    <header
      className="
        w-full
        px-4 sm:px-5 md:px-6 lg:px-8 py-4 md:py-6
        border-b border-white/20
        backdrop-blur-md
        bg-black/30
        shadow-[0_1px_3px_rgba(255,255,255,0.05)]
        z-50
      "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <NavLink
          to={user ? "/" : "/welcome"}
          className={themeFonts.logo}
          onClick={() => setMenuOpen(false)}
        >
          Dream Catcher
        </NavLink>

        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex gap-10 text-xs tracking-wider uppercase font-sans text-white/80">
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
                Home
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
                Archive
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
              About
            </NavLink>
          </nav>
          <button
            onClick={toggleLanguage}
            className="uppercase text-xs text-white/60 hover:text-white transition tracking-widest"
          >
            {i18n.language === "en" ? "RU" : "EN"}
          </button>

          {!user ? (
            <div className="flex items-center gap-4">
              <NavLink
                to="/register"
                className="
                  uppercase text-xs tracking-widest transition
                  text-white/70 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]
                "
              >
                Sign Up
              </NavLink>
              <LoginButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSignOut}
                className={`
                  ${themeFonts.tag}
                  ${themeColors.glowSoft}
                  ${themeSpacing.button}
                  ${themeEffects.button.base}
                  ${themeEffects.button.hover}
                  ${themeEffects.button.active}
                  backdrop-blur-sm
                  `}
              >
                Sign Out
              </button>

              <img
                src={user.photoURL}
                alt="avatar"
                className="w-10 h-10 rounded-md border border-white/20 shadow-md"
              />
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
              onClick={() => setMenuOpen(false)}
              className="hover:text-white transition"
            >
              Home
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/archive"
              onClick={() => setMenuOpen(false)}
              className="hover:text-white transition"
            >
              Archive
            </NavLink>
          )}
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-white transition"
          >
            About
          </NavLink>

          {user && (
            <button
              onClick={() => {
                handleSignOut();
                setMenuOpen(false);
              }}
              className="text-white/60 hover:text-white transition text-sm tracking-wider uppercase"
            >
              Sign Out
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
