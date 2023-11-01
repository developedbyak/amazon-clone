import {
    DocumentData,
    DocumentSnapshot,
    FieldValue,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import db from "./firebase";
import toast from "react-hot-toast";

// createNewUser
export const createNewUser = async (userData) => {
    const userRef = doc(db, "users", userData.email);
    await setDoc(userRef, userData);
};
