import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../config/firebase.js'

async function createAccount(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    if (userCredential){
        return userCredential.user.uid;
    }

    return ""
    /*        .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });*/
}

export {
    createAccount
}