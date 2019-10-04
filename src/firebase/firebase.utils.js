import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    'login_hint': 'user@example.com',
    prompt: 'select_account'//trigger the pop up when a account is selected.
  });
export const signInWithGoogle = () => auth.signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(error);
  });

export default firebase;