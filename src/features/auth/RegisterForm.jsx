import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  themeFonts,
  themeColors,
  themeRadii,
  themeBlur,
  themeBorders,
  themeSpacing,
  themeEffects,
} from "../../utils/themeTokens";
import LoginButton from "./LoginButton";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 bg-[--color-dark]">
      <form
        onSubmit={handleRegister}
        className={`
          w-full max-w-md
          ${themeColors.blockBg}
          ${themeColors.blockBlur}
          ${themeColors.blockBorder}
          ${themeRadii.base}
          ${themeBlur.medium}
          ${themeBorders.subtle}
          ${themeSpacing.card.padding.mobile}
          ${themeSpacing.card.gap.mobile}
          shadow-xl text-white
        `}
      >
        <h2 className={`${themeFonts.sectionTitle} mb-6`}>
          {t("form.create_account")}
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            className={`bg-transparent border border-white/20 rounded
              ${themeFonts.input}
              ${themeRadii.sm}
              ${themeBorders.input}
              px-4 py-2
              ${themeEffects.input.base}
              ${themeEffects.input.focus}
            `}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className={`
                bg-transparent border border-white/20 rounded
              ${themeFonts.input}
              ${themeRadii.sm}
              ${themeBorders.input}
              px-4 py-2
              ${themeEffects.input.base}
              ${themeEffects.input.focus}
            `}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className={`
              bg-transparent border border-white/20 rounded
              ${themeFonts.input}
              ${themeRadii.sm}
              ${themeBorders.input}
              px-4 py-2
              ${themeEffects.input.base}
              ${themeEffects.input.focus}
            `}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`
              ${themeSpacing.button}
              border border-white/20
              ${themeRadii.sm}
              text-white/80
              font-sora
              font-medium
              tracking-wide
              ${themeEffects.button.base}
              ${themeEffects.button.hover}
              ${themeEffects.button.active}
              mt-2
            `}
          >
            {t("buttons.sign_up")}
          </button>
        </div>

        {error && <p className="text-rose-400 text-sm mt-4">{error}</p>}

        <p
          className={`${themeFonts.smallInfo} mt-6 text-center flex flex-wrap justify-center items-center gap-1 sm:gap-2`}
        >
          <span>{t("form.already_have_account")}</span>
          <LoginButton />
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
