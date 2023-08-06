// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'

import {
    getFirestore,
    doc,        //getting the doc
    getDoc,     //getting doc data
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

//authentication is a singleton object that will last for the entire life cycle of the website usage
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

//setting up database
export const db = getFirestore();

//this method is writing the document into our database after the user has been authorize from whatever service
//passing empty object as optional param
export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    //if usersnapshot not exist ==> create and then set the document with the data from the use auth
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    //if it is already exist the njust return the reference
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {

    if (!email || !password || !displayName) return;

    const createdUserWithEmailPassword = await createUserWithEmailAndPassword(auth, email, password);
    let {user} = createdUserWithEmailPassword;
    await updateProfile(user,{displayName:displayName});

    return createdUserWithEmailPassword;
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => { 
    return await signOut(auth); 
} 

export const onAuthStateChangedListener =  (callback) => {

    if(!callback) return;

    return onAuthStateChanged(auth, callback);
}

//collections portion for adding shop data into firestore db===========================================================================
//we r using batch and it act like a transaction
//  collectionkey   -   a string that signify what collection are we adding into our firestore db: in this case: 'categories'
//  objToAdd        -   the shop data collection from shop_data.js that we use in productContext
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd ) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });

    await batch.commit();
    console.log('done')
}

//getting data from categories collection
export const getCategoriesAndDocument = async () => {
    const collectionRef = collection (db,'categories');  //same as the other method first line, must get that ref
    const q =  query(collectionRef);
    const querySnapshot = await getDocs(q);             //after this you can access the dat aby using querySnapshot.doc

    // S1: step thru each obj return using reduce
    // S2: destructuring the data into titles and items
    // S3: set the accumulator array 
    const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot)=>{
        const {title, items} = docSnapshot.data();
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {})                       

    return categoryMap;
}