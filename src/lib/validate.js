import db from "../../firebase/firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

export const UserValidate = async (email) => {
    try {
        const userRef = doc(db, "users", email);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

export const isUserAvailable = async (email) => {
    try {
        const userRef = doc(db, "users", email);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
            return snapshot.data();
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

export const UserValidateWithMail = async (email) => {
    try {
        const userRef = collection(db, "users");
        const querySnapshot = await getDocs(
            query(userRef, where("email", "==", email))
        );
        if (querySnapshot.empty) {
            return null;
        } else {
            const data = querySnapshot.docs[0].data();
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};
