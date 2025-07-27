import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginButton from "../features/auth/LoginButton";

const WelcomePage = () => {
  const user = useSelector((state) => state.user);

  if (user?.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-white px-6 text-center">
      <h1 className="text-4xl font-sora font-light mb-4">Dream Catcher</h1>
      <p className="text-white/60 max-w-md">
        An ambient space for logging your dreams, exploring unconscious
        patterns, and receiving AI interpretations.
      </p>
      <div className="mt-6 flex items-baseline gap-6">
        <NavLink
          to="/register"
          className=" uppercase text-xs tracking-widest transition 
                    text-white/70 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
        >
          Sign up
        </NavLink>
        <p className="text-sm text-white/60 ">Already have an account?</p>
        <LoginButton />
      </div>
    </div>
  );
};

export default WelcomePage;
