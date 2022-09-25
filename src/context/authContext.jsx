import { createContext , useState,useEffect} from 'react'
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
export const authContext = createContext();



const AuthProvider =( {children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log({ currentUser });
          setUser(currentUser);
          setLoading(false)
        });
        return () => unsubuscribe();
      }, []);
    return (
        <authContext.Provider value={
            {
                user,
                loading
            }
        }>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;