import { Outlet } from "react-router-dom";
import Header from "./Header";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
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
