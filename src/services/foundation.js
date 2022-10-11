import { addDoc,collection, onSnapshot ,query, orderBy, doc, getDoc, setDoc, getDocs, where} from "firebase/firestore"
import { firestore } from "../config/firebase"


const getAcceptedFoundations =async ()=>{
    const collectionRef = collection(firestore,'fundacion');
    const q = query(collectionRef,where('estado','==' ,2));
    const docsSnap  = await getDocs(q);
    const data = []
    if(docsSnap.docs.length > 0) {
        docsSnap.forEach(doc => {
            data.push({
                ...doc.data(),
                id :doc.id
            })
        })
     }
     return data;
}

const getFoundation = async(id)=>{
    const docRef = doc(firestore,'fundacion',id)
    const docSnap = await getDoc(docRef);
    return {
        id:docRef.id,
        ...docSnap.data()
    };
}

const saveFoundation = async(data)=>{
    try {
        await addDoc(collection(firestore, 'fundacion'), data)
    } catch (error) {
        alert(error)
    }
}
const getFoundationsByCategory = async(idCategoria)=>{
    
    const collectionRef = collection(firestore,'fundacion');
    const q = query(collectionRef,where('estado','==' ,2),where('idCategoria','==',idCategoria));
    const docsSnap  = await getDocs(q);
    const data = []
    if(docsSnap.docs.length > 0) {
        docsSnap.forEach(doc => {
          
            data.push({
                ...doc.data(),
                id :doc.id
            })
        })
     }
    
     return data;
}

const getFoundationsByDepartment = async(idDepartment)=>{
    const collectionRef = collection(firestore,'fundacion');
    const q = query(collectionRef,where('estado','==' ,2),where('idDepartamento','==',idDepartment));
    const docsSnap  = await getDocs(q);
    const data = []
    if(docsSnap.docs.length > 0) {
        docsSnap.forEach(doc => {
     
            data.push({
                ...doc.data(),
                id :doc.id
            })
        })
     }
    
     return data;
}

const getFoundationByUser = async(email)=>{
    const collectionRef = collection(firestore,'fundacion');
    const q = query(collectionRef,where('correo','==',email));
    const docsSnap = await getDocs(q);
    const data = []
    if(docsSnap.docs.length > 0) {
        docsSnap.forEach(doc => {
     
            data.push({
                ...doc.data(),
                id :doc.id
            })
        })
     }
     return data[0]
}

const updateFoundation =async(id)=>{
        const docRef = doc(firestore, "fundacion", id);
        await setDoc(docRef,{
            estado : 1
        } , {
            merge : true
        })
        
      
    
}

export {getAcceptedFoundations , getFoundation , saveFoundation , getFoundationsByCategory, getFoundationsByDepartment ,getFoundationByUser,updateFoundation}