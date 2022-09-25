import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// The firebase credentials are hardcoded in this file because this project isn´t very important
const firebaseConfig = {
    apiKey: "AIzaSyBew9taHyvClJe-x1FmF7XulMwmRyVi1Kg",
    authDomain: "fundacion-b0041.firebaseapp.com",
    projectId: "fundacion-b0041",
    storageBucket: "fundacion-b0041.appspot.com",
    messagingSenderId: "1001429836741",
    appId: "1:1001429836741:web:5dbec217cd6c4f094021ac"
};


const app = initializeApp(firebaseConfig);
const firestore=getFirestore(app)
const auth=getAuth(app)
const storage=getStorage(app)

export {
    firestore,
    auth,
    storage
}
