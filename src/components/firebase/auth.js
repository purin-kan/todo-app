import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as fireBaseSignOut } from "firebase/auth";
import { app } from './firebase'
import { useUidStore } from '../../stores/store';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);


export const authentication = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    useUidStore().user = result.user
    useUidStore().uid = result.user.uid

  } catch (error) {
    const errorCode = error.code;
    console.log(errorCode);

    const errorMessage = error.message;
    console.log(errorMessage);

    const email = error.customData.email;
    console.log('Error email: ', email);

    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log('Error credential: ', credential);
  }
};

export const signOut = async () => {
  try {
    await fireBaseSignOut(auth)
    
    useUidStore().uid = null
    useUidStore().user = null
  } catch (error) {
    console.log('sign out failed', error);
  };
}