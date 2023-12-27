import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyBksr-ign4ZZZdlV03VrDu9EhCDi8IfQ",
  authDomain: "slack-clone-ded1a.firebaseapp.com",
  projectId: "slack-clone-ded1a",
  storageBucket: "slack-clone-ded1a.appspot.com",
  messagingSenderId: "666991840322",
  appId: "1:666991840322:web:dd516b9a920508ee04f1db",
  measurementId: "G-4Q9KHL0CS9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
