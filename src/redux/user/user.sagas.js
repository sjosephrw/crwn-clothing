import { takeLatest, put, all, call } from 'redux-saga/effects';

import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import UserActionTypes from './user.types';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions';

export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try {    
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);

        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))

    } catch (error) {
        yield put(signInFailure(error));
    }    
}


export function* signInWithGoogle(){
    try {//any API query could fail so we have to be ready to handle it with try catch 
        //this is an object we destructure the user porperty off it
        const { user } = yield auth.signInWithPopup(googleProvider);
        // console.log(userRef);

        yield getSnapshotFromUserAuth(user);
    
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }){
    
    // const { email, password } = emailAndPassword;

    try {//any API query could fail so we have to be ready to handle it with try catch 
        //signInWithEmailAndPassword built in to fire base

      //signInWithEmailAndPassword and signInWithPopup will give us back the same obj.   
      const { user } = yield auth.signInWithEmailAndPassword(
        email,
        password
      );
        
        // console.log(user);  

        // const userRef = yield call(createUserProfileDocument, user);
        // const userSnapshot = yield userRef.get();

        // yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))

        yield getSnapshotFromUserAuth(user);


    //   this.setState({//clear the form fields
    //     email: '',
    //     password: ''
    //   });


    } catch (error) {
      console.log(error);
      yield put(signInFailure(error));

    }
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAuthenticated(){

    try {
    
        const userAuth = yield getCurrentUser();
        if (!userAuth) return; //if the user is not logged in    
        yield getSnapshotFromUserAuth(userAuth);        

    } catch (error){
        console.log(error);
        yield put(signInFailure(error));        
    }
    
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut(){

    try {
    
        yield auth.signOut();     
        yield put(signOutSuccess()); 

    } catch (error){
        console.log(error);
        yield put(signOutFailure(error));        
    }    
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* signUp({ payload: { email, password, displayName } }){
    try {

        const { user } = yield auth.createUserWithEmailAndPassword(
            email,
            password
        );
      
        yield put(signUpSuccess({ user, additionalData: { displayName } })); 

    } catch (error) {
        console.log(error);
        yield put(signUpFailure(error)); 
    }
}

export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* signInAfterSignUp({ payload: { user, additionalData } }){

    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onSignUpStart), call(onSignUpSuccess)]);
}