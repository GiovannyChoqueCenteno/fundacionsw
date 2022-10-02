import { async } from "@firebase/util"
import { addDoc,collection, onSnapshot ,query, orderBy, doc, getDoc, setDoc, getDocs, where} from "firebase/firestore"

import { firestore } from "../config/firebase"

const saveRequest = async(data)=>{
    try {
        await addDoc(collection(firestore, 'solicitud'), {
            ...data ,
            estado : parseInt(data.estado),
            idDepartamento : parseInt(data.idDepartamento),
            idCategoria : parseInt(data.idCategoria),
            telefono : parseInt(data.telefono)
        })
    } catch (error) {
        alert(error)
    }
}




const getRequests = async()=>{
    try {
        const colRef = collection(firestore, "solicitud");
        const queryRef =  query(colRef , where('estado' , '==',1));
        const docsSnap = await getDocs(queryRef)
        const data = []
        if(docsSnap.docs.length > 0) {
            docsSnap.forEach(doc => {
               console.log(doc.data());
               console.log(doc.id);
                data.push({
                    ...doc.data(),
                    _id :doc.id
                })
            })
         }
         return data;
    } catch (error) {
        console.log(error)
        return error;
    }
}

const getRequest = async(id)=>{
    const docRef = doc(firestore , "solicitud",id)
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

const acceptRequest = async(id , data)=>{
    const docRef = doc(firestore, "solicitud", id);
    await setDoc(docRef,{
        estado : 2
    } , {
        merge : true
    })
    try {
        await addDoc(collection(firestore, 'fundacion'), data)
    } catch (error) {
        alert(error)
    }
}

export {saveRequest , getRequests , getRequest , acceptRequest}