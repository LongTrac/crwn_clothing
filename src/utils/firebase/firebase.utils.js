// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBoLWqohuoWIqE4Bt-yHicUVsNNG9CEKLw",
    authDomain: "crwn-clothing-db-ab308.firebaseapp.com",
    projectId: "crwn-clothing-db-ab308",
    storageBucket: "crwn-clothing-db-ab308.appspot.com",
    messagingSenderId: "847682555272",
    appId: "1:847682555272:web:f8930fa1eb5e9c82aa3e3d"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);

// provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);