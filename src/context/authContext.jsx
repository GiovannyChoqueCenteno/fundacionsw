import { createContext , useState,useEffect} from 'react'
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
export const authContext = createContext();



const AuthProvider =( {children})=>{
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          console.log(currentUser)
          setLoading(false)
            console.log(currentUser)
        });
        return () => unsubuscribe();
      }, []);
    const isAdmin = ()=>{
        if(user)
        return user.email==='admi@admi.com'
        return false;
    }
    return (
        <authContext.Provider value={
            {
                user,
                loading,
                isAdmin
            }
        }>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;