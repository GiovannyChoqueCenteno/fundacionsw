import { Navigate } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";

export function ClientRoute({ children }) {
  const { user ,loading } = useAuth();

  if (loading) return <h1>Loading</h1>;

  if(!user) {
    return <Navigate to="/signin" />
  }
  if (user ) {
    if(user.email === 'admi@admi.com')
    return <Navigate to="/admin" />
    return <>{children}</>;    
  };
}