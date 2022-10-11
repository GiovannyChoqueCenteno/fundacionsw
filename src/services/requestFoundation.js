import { addDoc,collection, onSnapshot ,query, orderBy, doc, getDoc, setDoc, getDocs, where, updateDoc} from "firebase/firestore"

import { firestore } from "../config/firebase"
import { saveFoundation, updateFoundation } from "./foundation"

const saveRequest = async(data)=>{
    try {
        await addDoc(collection(firestore, 'solicitud'), {
            ...data ,
            estado : parseInt(data.estado),
            idDepartamento : parseInt(data.idDepartamento),
            idCategoria : parseInt(data.idCategoria),
            telefono : parseInt(data.telefono)
        })
        await saveFoundation(data)
    } catch (error) {
        alert(error)
    }
}

const updateRequest = async(data , id)=>{
    const docRef = doc(firestore , "solicitud",id)
    try {
        await updateDoc(docRef,data)
        await updateFoundation(data)
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
                    id :doc.id
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

const acceptRequest = async(id , data,idFoundation)=>{
    const docRef = doc(firestore, "solicitud", id);
    await setDoc(docRef,{
        estado : 2
    } , {
        merge : true
    })
   const docRef2 = doc(firestore, "fundacion", idFoundation);
    await setDoc(docRef2,{
        estado : 2
    } , {
        merge : true
    })
    
    
}

const rejectRequest = async(id ,idFoundation)=>{
    const docRef = doc(firestore, "solicitud", id);
    await setDoc(docRef,{
        estado : 3
    } , {
        merge : true
    })
    const docRef2 = doc(firestore, "fundacion", idFoundation);
    await setDoc(docRef2,{
        estado : 3
    } , {
        merge : true
    })
   
}

const resetRequest = async(idFoundation ,data,idRequest)=>{
    console.log(data)
    console.log(idFoundation)
    console.log(idRequest)

    const docRef = doc(firestore, "solicitud", idRequest);
    await updateDoc(docRef, {
        ...data ,
        estado : parseInt(data.estado),
        idDepartamento : parseInt(data.idDepartamento),
        idCategoria : parseInt(data.idCategoria),
        telefono : parseInt(data.telefono)
    })
    const docRef2 = doc(firestore, "fundacion", idFoundation);
    await updateDoc(docRef2,{
        ...data ,
        estado : parseInt(data.estado),
        idDepartamento : parseInt(data.idDepartamento),
        idCategoria : parseInt(data.idCategoria),
        telefono : parseInt(data.telefono)
    })
}
const getRequestByUser = async(email)=>{
    const collectionRef = collection(firestore,'solicitud');
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

export {saveRequest , getRequests , getRequest , acceptRequest , rejectRequest , updateRequest , resetRequest , getRequestByUser}