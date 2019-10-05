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


export const auth = firebase.auth();

export const firestore = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'//trigger the pop up when a account is selected.
  });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
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