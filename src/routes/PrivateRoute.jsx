import { Navigate } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";

export function ProtectedRoute({ children }) {
  const { user ,loading } = useAuth();
  if (loading) return <h1>Loading</h1>;

  if (!user && user.email!=='admi@admi.com') return <Navigate to="/login" />;

  return <>{children}</>;
}