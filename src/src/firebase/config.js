import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQDlpYfFKGDxt5o99mvFjIBeGgWBQNmbc",
  authDomain: "the-bookers-51d4b.firebaseapp.com",
  projectId: "the-bookers-51d4b",
  storageBucket: "the-bookers-51d4b.appspot.com",
  messagingSenderId: "520950071925",
  appId: "1:520950071925:web:64db93218c13f36b39ae3c",
};
// init firebase
firebase.initializeApp(firebaseConfig);
// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
// timestamp

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
