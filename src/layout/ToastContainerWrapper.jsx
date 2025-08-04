import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerWrapper = () => (
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar
    closeOnClick
    draggable={false}
    pauseOnHover
    toastClassName={() =>
      "bg-white/10 backdrop-blur-md border border-white/10 text-white font-sora text-base px-6 py-4 rounded-xl shadow-[0_2px_12px_rgba(255,255,255,0.08)]"
    }
    bodyClassName={() => "flex items-center whitespace-pre-line"}
    style={{ marginTop: "6rem" }}
  />
);

export default ToastContainerWrapper;
