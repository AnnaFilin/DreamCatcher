import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

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
      Sign In
    </button>
  );
};

export default LoginButton;
