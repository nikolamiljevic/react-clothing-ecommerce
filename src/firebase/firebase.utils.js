import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAvT4KCGdiTNum15Cn5w-rhwJqLqM0JYVs",
    authDomain: "react-clothing-ecommerce.firebaseapp.com",
    databaseURL: "https://react-clothing-ecommerce.firebaseio.com",
    projectId: "react-clothing-ecommerce",
    storageBucket: "react-clothing-ecommerce.appspot.com",
    messagingSenderId: "873935812369",
    appId: "1:873935812369:web:761c74364cf7c652473eb0",
    measurementId: "G-8SBQ44K3RX"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;