import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDS9_EVhVRecNH6cqB6GRD_p6x5oSHbnzs",
    authDomain: "test-bab9e.firebaseapp.com",
    projectId: "test-bab9e",
    storageBucket: "test-bab9e.appspot.com",
    messagingSenderId: "928947590226",
    appId: "1:928947590226:web:d95e3b73dcf64fad92bb8b",
    measurementId: "G-TK68YJP1FT"
    // apiKey: "AIzaSyB0EL-zBHwX40bK2v-eQ0Ce7tmiYK1yWek",
    // authDomain: "login-8e050.firebase.com",
    // projectId: "login-8e050",
    // storageBucket: "login-8e050.appspot.com",
    // messagingSenderId: "437076538811",
    // appId: "1:437076538811:web:00e4818b29891a9c45809e",
    // measurementId: "G-MZ13SXRG7J"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db , auth, storage };