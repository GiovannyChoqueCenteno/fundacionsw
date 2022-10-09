import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase.js";

async function savePayment(data) {
    await addDoc(collection(firestore, "payments"), data);
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


export {
    savePayment,
    updatePayment,
    getPayment,
    getAllPayments,
    listenAllPayments,
    deletePayment
}