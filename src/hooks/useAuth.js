import { useContext } from "react";
import { authContext } from "../context/authContext";
const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is no Auth provider");
    return context;
};
export default useAuth;