import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../config/firebase.js";

async function saveUser(data) {
    await setDoc(doc(firestore, "users", data.uid), data);
}

export {
    saveUser
}