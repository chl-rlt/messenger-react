import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/Messenger/messenger.css'
import { Switch, Route, Link, NavLink, Redirect } from "react-router-dom";
import logo from './logo.png';

// Import components 

import Login from "./components/login";
import SignUp from "./components/signup";
import Messenger from './components/Messenger'

export default function App() {

// Declaration of state variables with the useState hook 

  const [ isToken, setIsToken ] = useState(false)
  const [ token, setToken ] = useState('')
  const [ userId, setUserId ] = useState(null)

  // set the bool isToken to true if we have a token
  
  const getToken = (currentStateToken) => {
    setIsToken(currentStateToken)
  }

  // Stockage du token 

  const currentToken = localStorage.getItem('token')

  useEffect(() => {
    if(currentToken) {
      const currentId = localStorage.getItem('id')
      const currentIdToNum = parseInt(currentId)
      setUserId(currentIdToNum)
      setToken(currentToken)
      setIsToken(true)
    } else if (!currentToken) {
      setToken('')
      setUserId(null)
    }
  }, [isToken])

  // Fonction déconnexion

  const disconnect = () => {
    localStorage.clear()
    setIsToken(false)
  }

  return (

    // Menu de navigation JSX => render()

    <div className="App">
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/sign-in"}><img src={logo} alt="Logo" /></Link>
          <div id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto ">
              <li className="nav-item">
                { !token && <Link className="nav-link" to={"/sign-in"}>Login</Link> }
              </li>
              <li className="nav-item">
                { !token && <Link className="nav-link" to={"/sign-up"}>Sign Up</Link> }
              </li>
              <li className="nav-item">
                { token && <Link className="nav-link" onClick={disconnect} to={"/"}>Disconnect</Link> }
              </li>
            </ul>
          </div>
        </div>
      </nav> 

      {/*  Création des routes */}

      <div className="auth-wrapper">
          <Switch>
            <Route exact path='/'>
              { token ? <Redirect to="/messenger" /> : <Login getToken={getToken}/> }
            </Route>
            <Route path="/sign-in">
            { token ? <Redirect to="/messenger" /> : <Login getToken={getToken}/> }
            </Route>
            <Route path="/sign-up">
              { token ? <Redirect to="/messenger" /> : <SignUp /> }
            </Route>
            <Route>
              { !token ? <Redirect to="/sign-in" /> : <Messenger disconnect={disconnect} id={userId} token={token} /> }
            </Route>
          </Switch>
      </div>

      <div className="footer">
        
      </div>
    </div>
  );
}