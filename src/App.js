import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {

  constructor(){
    super()
  
    this.state = {
      currentUser: null
    }
  }

  //to log out, decalring a class property not inside constructor
  unsubscribeFromAuth = null;

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      this.unsubscribeFromAuth = this.setState({ currentUser: user });
      console.log(user);
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
        <Header currentUser={ this.state.currentUser }/>

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
          <Route path='/signin' component={SignInAndSignUpPage}/>
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

export default App;
