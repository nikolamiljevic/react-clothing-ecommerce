import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import { Link, Route, Switch } from 'react-router-dom'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route  exact path="/" component={HomePage}/>
        <Route  path="/shop" component={ShopPage}/>
        <Route  path="/signin" component={SignInAndSignUpPage}/>
      </Switch>
    </div>
  );
}

export default App;
