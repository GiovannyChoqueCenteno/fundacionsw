import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function PublicRoute({ children }) {
    console.log("Ruta publica")
    const { user, loading } = useAuth();
    if (loading) return <h1>Loading</h1>;

    if (user) {
        if (user.email === 'admi@admi.com')
            return <Navigate to="/admin" />
        return <>{children}</>;
    };

}