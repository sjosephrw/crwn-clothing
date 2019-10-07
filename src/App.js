import React from 'react';
import './App.css';
import { connect } from 'react-redux';//connect - Higher Order Component, that modifies our component to have access to things related to Redux
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';


import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {

  // constructor(){
  //   super()
  
  //   this.state = {
  //     currentUser: null
  //   }
  // }

  //to log out, decalring a class property not inside constructor
  unsubscribeFromAuth = null;

  componentDidMount(){

    const { setCurrentUser } = this.props; 

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //  this.setState({ currentUser: user });
      
      if (userAuth){//if logging in 
        const userRef = await createUserProfileDocument(userAuth);

        //if (userRef){
          userRef.onSnapshot(snapShot => {
            console.log(snapShot.data());//important you must add the .data() method to see the newly created user Data
          
            //replaced by the redux functions below
            // this.setState({
            //   currentUser: {
            //     id: snapShot.id,
            //     ...snapShot.data()
            //   }
            // }, () => {
            //   console.log(this.state);//setState is async that is why we assing it as a callback
            // });
          //******************** */
            // this.props.setCurrentUser({
            //     id: snapShot.id,
            //     ...snapShot.data()
              
            // }, () => {
            //   console.log(this.state);//setState is async that is why we assing it as a callback
            // });
          //********************** */  
            setCurrentUser({
              //when ever the user snapshot updates we are settign the userReducer value with the new obj.
                id: snapShot.id,
                ...snapShot.data()
              
            }, () => {
              console.log(this.state);//setState is async that is why we assing it as a callback
            });

          });
        //}

      } else {//if logged out then userAuth will be null so we are setting currentUser to null
        // this.setState({ currentUser: userAuth });
        setCurrentUser( userAuth );

      }  
      // console.log(userAuth);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();//when the user logs out this will close the subscription
  }

  render(){
    return (
      <div className="App">
{      //making the header aware that the user has logged out /or in to display sign in or log out links 
}      
        {/* <Header currentUser={ this.state.currentUser }/> */}
        <Header/>
        {//https://reacttraining.com/react-router/web/guides/quick-start}
        
          /* 
          exact is either true or false, exact={true}, exact={false} , can write it this way also
          if we just write exact it's true, if we dont write exact it's false
          if we dont write exact and the url is localhost:3000/hast then home page will render and hats below it
          */
        
        /* <Route exact path='/' component={HomePage}/>
        <Route path='/hats' component={HatsPage}/> */
  
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          {/* <Route path='/signin' component={SignInAndSignUpPage}/> */}
          {/* //redirect to homepage if logged in and trying to access login page */}
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}/>

        </Switch>
  
        /* <Router>
          <div>
          <nav>
            <ul>
              <li>
                <Link to="/hats">Hats</Link>
              </li>
            </ul>
          </nav>
            <HomePage/>
              <Switch>
                <Route path="/hats">
                  <HatsPage />
                </Route>
              </Switch>
          </div>
    </Router> */}
      </div>
    );    
  }
  
}
//{ user } - destructuring the userReducer 
// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

//doing the above differently
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

//***********LEC 101 kind of confusing */
const mapDispatchToProps = dispatch => ({
  //setCurrentUser is passed in a  user obj. that calls dispatch() function - dispatch - a way for redux to know that whatever you are passing into me is a action obj. that I am going to pass into every reducer
  setCurrentUser: user => dispatch(setCurrentUser(user))//setCUrrentUse(user) - is the action obj. so we are dispatching the action obj.
  //so we dont nedd the app constructor any more.
});

//***********LEC 101 kind of confusing */
//connect - a HOC are functions that accept components as args. and return a improved component 
//but here we pass only the 2nd function into the HOC the first one is null, the 2nd one optional, 
// export default connect(null, mapDispatchToProps)(App);

//this time we can pass in the 2nd function because we need to redirect to another page
//if the user tries to access the login register page after signing in 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
