import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

export default function ProtectedRoute({ children }) {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}