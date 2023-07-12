import { getStorage, ref as fireBaseRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from './firebase'
import { useUidStore } from '../../stores/store';

const storage = getStorage(app);

export let downloadURL = null

export const saveFile = async (file) => {
    downloadURL = null

    try {
        const snapshot = await uploadBytes(fireBaseRef(storage, "ToDoFiles/" + file.name), file);
        downloadURL = await getDownloadURL(snapshot.ref);
        
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}
