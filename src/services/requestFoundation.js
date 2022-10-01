import { addDoc,collection, onSnapshot ,query, orderBy} from "firebase/firestore"

import { firestore } from "../config/firebase"

const saveRequest = async(data)=>{
    try {
        await addDoc(collection(firestore, 'solicitud'), data)
    } catch (error) {
        alert(error)
    }
}

const getRequests = ()=>{
    try {
        return  query(collection(firestore, 'solicitud'), orderBy('idCategoria'))
    
    } catch (error) {
        return error;
    }
}
export {saveRequest , getRequests}