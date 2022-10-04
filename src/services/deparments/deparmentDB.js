import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase.js";

async function saveDeparment(data) {
    await addDoc(collection(firestore, "deparments"), data);
}

async function updateDeparment(id, data) {
    await setDoc(doc(firestore, "deparments", id), data);
}

async function getDeparment(id) {
    const docRef = doc(firestore, "deparments", id);
    const document = await getDoc(docRef);
    return {
        id: document.id,
        ...document.data()
    }
}

async function getAllDeparments() {
    const querySnapshot = await getDocs(collection(firestore, "deparments"));
    const list = [];
    querySnapshot.forEach((currentDoc) => {
        const document = {
            id: currentDoc.id,
            ...currentDoc.data()
        }
        list.push(document);
    });

    return list;
}

/**
 * @param setDeparments is a hook to change value every time that deparments changing
 * @returns a function to unsubscribe to listen deparments "unsubscribe()"
 */
async function listenAllDeparments(setDeparments) {
    const q = query(collection(firestore, "deparments"));
    return onSnapshot(q, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((currentDoc) => {
            document = {
                id: currentDoc.id,
                ...currentDoc.data()
            }
            list.push(document);
        });

        setDeparments(list);
    });
}

async function deleteDeparment(id) {
    await deleteDoc(doc(firestore, "deparments", id))
}


export {
    saveDeparment,
    updateDeparment,
    getDeparment,
    getAllDeparments,
    listenAllDeparments,
    deleteDeparment
}