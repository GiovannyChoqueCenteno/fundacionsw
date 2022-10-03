import { addDoc,collection, onSnapshot ,query, orderBy, doc, getDoc, setDoc, getDocs, where} from "firebase/firestore"
import { firestore } from "../config/firebase"


const getAcceptedFoundations =async ()=>{
    const collectionRef = collection(firestore,'fundacion');
    const q = query(collectionRef,where('estado','==' ,2));
    const docsSnap  = await getDocs(q);
    const data = []
    if(docsSnap.docs.length > 0) {
        docsSnap.forEach(doc => {
           console.log(doc.data());
           console.log(doc.id);
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
    return docSnap.data();
}

const saveFoundation = async(data)=>{
    try {
        await addDoc(collection(firestore, 'fundacion'), data)
    } catch (error) {
        alert(error)
    }
}

export {getAcceptedFoundations , getFoundation , saveFoundation}