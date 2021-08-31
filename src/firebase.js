import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDfbDB8DJ5i_pF9MZHROecQ8BV74S3se9o",
    authDomain: "whatsapp-clone-aec24.firebaseapp.com",
    projectId: "whatsapp-clone-aec24",
    storageBucket: "whatsapp-clone-aec24.appspot.com",
    messagingSenderId: "388650841006",
    appId: "1:388650841006:web:3386881c383d06228e4e3f",
    measurementId: "G-YHC7GST0N8"
  };

//initialize firebase app with firebase config, pass config object store in firebase APP
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();   //access firestore db instance
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();    // Google Authentication

export { auth, provider };
export default db;