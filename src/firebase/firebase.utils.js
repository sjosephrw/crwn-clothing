import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//CLOUD FIRESTORE LOACTION nam5 (us-central) 
//the to libraries below will be automatically attached into import firebase
// import 'firebase/firestore';
// import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDtIbrix1qylG495jaaQ0EGLjkG0o_Ee-k",
    authDomain: "crwn-clothing-b4ddf.firebaseapp.com",
    databaseURL: "https://crwn-clothing-b4ddf.firebaseio.com",
    projectId: "crwn-clothing-b4ddf",
    storageBucket: "",
    messagingSenderId: "657639278236",
    appId: "1:657639278236:web:ff010919934712239ccf59",
    measurementId: "G-WE42JTHXNQ"    
}

firebase.initializeApp(config);


// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   // console.log(firestore.doc(`/users/1111aabbccss`));//this returns the userRef obj.
//   const userRef = firestore.doc(`users/${userAuth.uid}`);//this returns the userRef obj.
  
//   const snapShot = await userRef.get();//.get(), .set(), .update(), .delete()
  
//   console.log(snapShot);
  
//   if (!snapShot.exists){//checks for duplicate users if there are no duplicate values then register the user
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await userRef.set({
//         displayName,
//         email,
//         createdAt,
//         ...additionalData
//       })
//     } catch (error){
//       console.log(error);
//     }
//     return userRef;
//   }
// } 

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // console.log(firestore.doc(`/users/1111aabbccss`));//this returns the userRef obj.
  const userRef = firestore.doc(`users/${userAuth.uid}`);//this returns the userRef obj.

  const snapShot = await userRef.get();//.get(), .set(), .update(), .delete()

  if (!snapShot.exists) {//checks for duplicate users if there are no duplicate values then register the user
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

//objects to add will be a array
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  //we can not add an entire array into firebase we have to do it bit by bit
  //with the batch method if at least one record fails to write to the db we want the entire thing to fail
  const batch = firestore.batch();
  
  objectsToAdd.forEach(obj => {
    
    const newDocRef = collectionRef.doc();
    console.log(newDocRef);
    //newDocRef.set(prop, val)//can not be used because we are adding many records must use batch.set
    batch.set(newDocRef, obj);//newDocRef - prop, obj - value
  });
  return await batch.commit();//fires the request, and returns a promise
}

// export const convertCollectionsSnapshotToMap = (collections) => {
// //now though the routing and ids were removed from the db data we need to get them back into our App
// //so
//   //collections.doc holds the shop collections data
//   const transformedCollection = collections.doc.map(doc => {
//     const { title, items } = doc.data();//when we analized the firebase returned data we saw this

//     return {
//       //create the routename with the title
//       routeName: encodeURI(title.toLowerCase()),
//       id: doc.id,//the id was in doc.id and not in doc.data()
//       title,
//       items
//     }
//   });
  
//   console.log(transformedCollection);

// }

//refer to the commented out code above for explanations
export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  //console.log(transformedCollection);//this is a array of objs. that we have to convert to a obj. of objs.

  return transformedCollection.reduce((accumulator, collection) => {
    //hats = hats collection onfirst iteration, on 2nd jackets = jackets collection
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {}//the obj. of objs. will be stored into this empty obj. 
  );
};

//we write a promise to check whether the user is logged in, becuase this code is used in the user saga and sagas use promises
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();//must be to run this function in here, he didn't explain
      resolve(userAuth);
    }, reject)//onAuthStateChanged secondary function is handles the error so we just pass back the reject parameter there
  })
}

export const auth = firebase.auth();

export const Logout = () => firebase.auth().signOut().then(function() {
  console.log('Signed Out');
}, function(error) {
  console.error('Sign Out Error', error);
});

export const firestore = firebase.firestore();

//now we are exporting out the provider into the user.sagas.js file
// const provider = new firebase.auth.GoogleAuthProvider();

// provider.setCustomParameters({
//     prompt: 'select_account'//trigger the pop up when a account is selected.
//   });

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'//trigger the pop up when a account is selected.
});

//export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);




// .then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//     console.log(error);
//   });

export default firebase;