import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="
        uppercase text-xs tracking-widest transition
        text-white/70 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]
      "
    >
      {t("buttons.sign_in")}
      {/* Sign In */}
    </button>
  );
};

export default LoginButton;
