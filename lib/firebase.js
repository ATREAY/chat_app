import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCs56pOtZxkFLwVW07h_9Wr3fR_N9D7yTE",
    authDomain: "chat-app-e1db5.firebaseapp.com",
    projectId: "chat-app-e1db5",
    storageBucket: "chat-app-e1db5.appspot.com",
    messagingSenderId: "897231243559",
    appId: "1:897231243559:web:c3176b297f6ffb2a698102",
    measurementId: "G-JDGECWZVTG"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };