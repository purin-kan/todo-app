import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from './firebase'
import { useUidStore } from '../../stores/store';
const db = getFirestore(app);

export const findAccount = async () => {

    const docRef = doc(db, "todo", useUidStore().uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        fetchData()
    } else {
        await setDoc(doc(db, "todo", useUidStore().uid), {
            username: useUidStore().user.displayName,
            uid: useUidStore().uid,
            tasks: null
        });
        console.log('user created');
    }
}

const fetchData = () => {
    useUidStore().uid
    useUidStore().user

}