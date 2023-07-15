// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth'

import {
    getFirestore,
    doc,        //getting the doc
    getDoc,     //getting doc data
    setDoc
} from 'firebase/firestore'
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
const firebaseApp = initializeApp(firebaseConfig);

// provider(s), we can have multiple providers doing multiple things for the website
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

//authentication is a singleton object that will last for the entire life cycle of the website usage
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//setting up database
export const db = getFirestore();


export const createUserDocFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //if usersnapshot not exist ==> create and then set the document with the data from the use auth
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        }catch( error ){
            console.log('error creating user', error.message);
        }
    }

    //if it is already exist the njust return the reference
    return userDocRef;
}