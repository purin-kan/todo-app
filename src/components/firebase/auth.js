import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from './firebase'


let user = {}

export const signIn = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
    console.log(user);
    console.log(user.uid);

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

export {
  user
}