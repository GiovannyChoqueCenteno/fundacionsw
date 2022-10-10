import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { firestore } from "../../config/firebase";

async function saveBill(data) {
    await addDoc(collection(firestore, "gasto"), {
        ...data
    });
}

async function updateBill(id, data) {
    await setDoc(doc(firestore, "gasto", id), data);
}

async function deleteBill(id) {
    await deleteDoc(doc(firestore, "gasto", id));
}

async function restarSaldo(fundacionId, monto) {
    let fundacion = await getDoc(doc(firestore, "fundacion", fundacionId));
    let data = fundacion.data();
    let saldoFinal = Number(data.saldo) - Number(monto);
    const updateFundacion = {
        ...data,
        saldo: saldoFinal
    }
    await setDoc(doc(firestore, "fundacion", fundacionId), updateFundacion);
    return saldoFinal;
}

async function aumentarSaldo(fundacionId, monto) {
    let fundacion = await getDoc(doc(firestore, "fundacion", fundacionId));
    let data = fundacion.data();
    let saldoFinal = Number(data.saldo) +  Number(monto);
    const updateFundacion = {
        ...data,
        saldo: saldoFinal
    }
    await setDoc(doc(firestore, "fundacion", fundacionId), updateFundacion);
    return saldoFinal;
}

async function getAllBills(fundacionId) {
    const q = query(collection(firestore, "gasto"), where("fundacionId", "==", fundacionId));
    const querySnapshot = await getDocs(q);
    let list = [];
    querySnapshot.forEach((currentDoc) => {
        let document = {
            id: currentDoc.id,
            ...currentDoc.data()
        }
        list.push(document);
    });
    return list;
}

async function getOneFundacion(fundacionId) {
    return await getDoc(doc(firestore, "fundacion", fundacionId));
}

export {
    saveBill,
    updateBill,
    deleteBill,
    getAllBills,
    restarSaldo,
    aumentarSaldo,
    getOneFundacion
}