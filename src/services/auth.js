import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from '../config/firebase.js'

async function createAccount(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    if (userCredential){
        return userCredential.user.uid;
    }

    return ""
}

async function signIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
}

async function closeSession() {
    return await signOut(auth);
}

export {
    createAccount,
    signIn,
    closeSession
}