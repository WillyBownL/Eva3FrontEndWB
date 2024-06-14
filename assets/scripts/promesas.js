import { collection, addDoc, getDocs,deleteDoc,updateDoc,doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase.js";

export const registrarCuenta = async(Cuenta)=>{
    console.log("Cuenta");
    const docRef = await addDoc(collection(db, "Cuenta"), Cuenta);
}

export const recuperarCuenta = async()=>{
    const ref = collection(db, "Cuenta"); 
    const querySnapshot = await getDocs(ref)
    console.log(querySnapshot);
    let listado = []
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        listado.push({...doc.data(),id:doc.id});
    });
    
    console.log(listado);
    return listado;
}
export const actualizarCuenta = async(Cuenta,id) => {
    const ref = doc(db, "Cuenta", id);
    await updateDoc(ref, Cuenta);
}
export const eliminarCuenta = async(id)=>{
    const ref = doc(db, "Cuenta", id);
    await deleteDoc(ref);
}