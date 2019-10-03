import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import { BrowserRouter as Router, Switch, Route, Link  } from "react-router-dom";
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component';

const HatsPage = () => (
  <div>
    <div>Hats Page</div>
  </div>
)


function App() {
  return (
    <div className="App">
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

export default App;
