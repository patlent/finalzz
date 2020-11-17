import React from 'react';

import './App.css';
import Store from "./components/Store";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import Nav from "./components/Nav";

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Route exact path={"/"} component={Store}/>
          <Route exact path={"/cart"} component={Cart}/>
          <Route exact path={"/admin"} component={Admin}/>
      </Router>

    </div>
  );
}

export default App;
