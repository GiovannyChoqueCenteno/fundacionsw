import {addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc} from "firebase/firestore";
import {firestore} from "../../config/firebase.js";

async function saveCategory(data) {
    await addDoc(collection(firestore, "categories"), data);
}

async function updateCategory(id,data) {
    await setDoc(doc(firestore, "categories"), data);
}

async function getCategory(id){
    const docRef = doc(firestore, "categories", id);
    const document = await getDoc(docRef);
    return {
        id: document.id,
        ...document.data()
    }
}

async function getAllCategories(){
    const querySnapshot = await getDocs(collection(firestore, "categories"));
    const list=[];
    querySnapshot.forEach((currentDoc) => {
        const document={
            id: currentDoc.id,
            ...currentDoc.data()
        }
        list.push(document);
    });

    return list;
}

/**
 * @param setCategories is a hook to change value every time that categories changing
 * @returns a function to unsubscribe to listen categories "unsubscribe()"
 */
async function listenAllCategories(setCategories){
    const q = query(collection(firestore, "categories"));
    return onSnapshot(q, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((currentDoc) => {
            document = {
                id: currentDoc.id,
                ...currentDoc.data()
            }
            list.push(document);
        });

        setCategories(list);
    });
}


export {
    saveCategory,
    updateCategory,
    getCategory,
    getAllCategories,
    listenAllCategories
}