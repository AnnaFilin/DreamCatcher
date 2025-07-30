import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import LoginButton from "../features/auth/LoginButton";
import AnimatedDreams from "../features/animations/AnimatedDreams";
import DreamModal from "../features/dream/DreamModal";
import useUserSync from "../hooks/useUserSync";

const Layout = () => {
  const [user, loading] = useAuthState(auth);

  useUserSync();

  if (loading) return <p className="text-white p-8">Loading...</p>;

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
        <LoginButton />
      </div>
    );

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-gray-100 font-sora">
      <div className="absolute inset-0 bg-[--color-background] bg-texture-linen"></div>

      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-500 opacity-20 blur-[150px] pointer-events-none z-10"></div>

      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 opacity-30">
        <AnimatedDreams />
      </div>

      <div className="relative z-20 flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-hidden pt-16 md:pt-24">
          <Outlet />
        </main>

        <DreamModal />
        <footer
          className="
            w-full
            px-4 sm:px-6 md:px-8 py-3
            border-t border-white/10
            backdrop-blur-md
            bg-black/30
            shadow-[0_-1px_3px_rgba(255,255,255,0.05)]
            text-white/40 text-xs text-center
            z-40
          "
        >
          dream catcher © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};
export default Layout;
