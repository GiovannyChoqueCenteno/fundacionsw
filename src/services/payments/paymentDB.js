import { addDoc, updateDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, deleteDoc ,where } from "firebase/firestore";
import { firestore } from "../../config/firebase.js";

async function savePayment(data) {
    console.log(data)
    await addDoc(collection(firestore, "payments"), data);

    const fundacionRef = doc(firestore, "fundacion", data.fundacion_id);
    getDoc(fundacionRef).then(async res => {
        const saldo = res.data().saldo ?? 0;
        await updateDoc(fundacionRef, {
            saldo: saldo + data.amount
        });
    }).catch(err=>{

    });
}

async function updatePayment(id, data) {
    await setDoc(doc(firestore, "payments", id), data);
}

async function deletePayment(id) {
    await deleteDoc(doc(firestore, "payments", id));
}

async function getPayment(id) {
    const docRef = doc(firestore, "payments", id);
    const document = await getDoc(docRef);
    return {
        id: document.id,
        ...document.data()
    }
}

async function getAllPayments() {
    const querySnapshot = await getDocs(collection(firestore, "payments"));
    const list = [];
    querySnapshot.forEach((currentDoc) => {
        let document = {
            id: currentDoc.id,
            ...currentDoc.data()
        }
        list.push(document);
    });

    return list;
}

/**
 * @param setPayments is a hook to change value every time that payments changing
 * @returns a function to unsubscribe to listen payments "unsubscribe()"
 */
async function listenAllPayments(setPayments) {
    const q = query(collection(firestore, "payments"));
    return onSnapshot(q, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((currentDoc) => {
            document = {
                id: currentDoc.id,
                ...currentDoc.data()
            }
            list.push(document);
        });

        setPayments(list);
    });
}

async function getAllPaymentsByFoundation(idFundacion){
    const docsRef =collection(firestore, "payments");
    const q = query(docsRef,where('fundacion_id','==',idFundacion))
    const docsSnap = await getDocs(q)
    const data=[]
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
export {
    savePayment,
    updatePayment,
    getPayment,
    getAllPayments,
    listenAllPayments,
    deletePayment,
    getAllPaymentsByFoundation
}