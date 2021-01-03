import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import  HomeContainer  from "./Containers/HomeContainer"

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
                      <Users />
          </Route>
          <Route path="/">
            <HomeContainer />
          </Route>
        </Switch>
      </div>
    </Router>

  )
}


function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

