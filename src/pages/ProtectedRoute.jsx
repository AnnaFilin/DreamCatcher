import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default ProtectedRoute;
