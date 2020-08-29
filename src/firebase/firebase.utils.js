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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
      const collectionRef = firestore.collection(collectionKey);

      const batch = firestore.batch();
      objectsToAdd.forEach(obj => {
          const newDocRef = collectionRef.doc();
          batch.set(newDocRef,obj);
      });
      return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data(); 
      return {
        routeName: encodeURI( title ? title.toLowerCase() : ''),
        id: doc.id,
        title,
        items
      };
    });

    return transformedCollection.reduce((accumulator, collection)=>{
        accumulator[collection.title ? collection.title.toLowerCase() : ''] = collection;
        return accumulator;
    },{});

}

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;