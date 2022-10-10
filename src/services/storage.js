import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../config/firebase.js'

async function uploadImageProfile(file) {
    const timestamp = new Date().getTime();
    const imageRef = ref(storage, `profiles/${timestamp}-${file.name}`);

    await uploadBytesResumable(imageRef, file);

    return await getDownloadURL(imageRef);
}

async function uploadImageBill(file) {
    const timestamp = new Date().getTime();
    const imageRef = ref(storage, `gastos/${timestamp}-${file.name}`);
    await uploadBytesResumable(imageRef, file);
    return await getDownloadURL(imageRef);
}

export {
    uploadImageProfile,
    uploadImageBill
}