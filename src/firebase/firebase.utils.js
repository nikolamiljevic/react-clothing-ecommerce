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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();
      
      if(!snapShot.exists){
          const {displayName, email } = userAuth;
          const createdAt = new Date();

          try {
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })
          } catch (error) {
              console.log('error creating user', error.message);
          }
      }

      return userRef;
  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;