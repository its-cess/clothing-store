import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

//get this config object from the console of your firebase project online
//click the web </> icon, register your app, then copy the code that is generated
const firebaseConfig = {
  apiKey: "AIzaSyAk9pQFTGyhidGmiFkrVsYBhyD-hJYQKZg",
  authDomain: "crown-clothing-db-a7f78.firebaseapp.com",
  projectId: "crown-clothing-db-a7f78",
  storageBucket: "crown-clothing-db-a7f78.appspot.com",
  messagingSenderId: "733878058489",
  appId: "1:733878058489:web:5001e05be999c396681128"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if userSnapshot does not exist, then try to create it with setDoc
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  //if userSnapshot already exists, return the userDocRef;
  return userDocRef;
};
