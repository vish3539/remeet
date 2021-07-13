import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCRGiaX_ugR4JxdDDGeQrVSLgKGKzPTh4o",
    authDomain: "revents-de056.firebaseapp.com",
    projectId: "revents-de056",
    storageBucket: "revents-de056.appspot.com",
    messagingSenderId: "291026510399",
    appId: "1:291026510399:web:87b40fc0ea26f92f7a0e8a"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;

