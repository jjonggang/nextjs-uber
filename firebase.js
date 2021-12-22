// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIRE_KEY,
    authDomain: "uber-next-2394d.firebaseapp.com",
    projectId: "uber-next-2394d",
    storageBucket: "uber-next-2394d.appspot.com",
    messagingSenderId: "765348340633",
    appId: process.env.FIRE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth }