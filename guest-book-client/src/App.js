import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

import './App.css';

import NavBar from './components/navBar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Event from './components/Event';

const App = () => {
  // let {events,setEvents} = useState(axios.get(`http://localhost:8080/`)) 

  return (
    <Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/" exact component={Event} />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App
