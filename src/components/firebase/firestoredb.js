import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from './firebase'
const db = getFirestore(app);

export const fetchData = async (user) => {

    const docRef = doc(db, "todo", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        //TODO existing user, fetch existing tasks
        console.log('existing user, show tasks');
    } else {
        await setDoc(doc(db, "todo", user.uid), {
            username: user.displayName,
            uid: user.uid,
            tasks: null
        });
        console.log('user created');
    }
}