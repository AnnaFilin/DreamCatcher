import { Outlet } from "react-router-dom";
import Header from "./Header";

const PublicLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-gray-100 font-sora">
      <div className="absolute inset-0 bg-[--color-background] bg-texture-linen"></div>

      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-500 opacity-20 blur-[150px] pointer-events-none z-10"></div>

      <Header />
      <main className="flex-1  overflow-hidden">
        <Outlet />
      </main>
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
  );
};

export default PublicLayout;
