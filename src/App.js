import React from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import HomePage from "./HomePage.js";
import LoginPage from "./LoginPage.js";

import "./App.css"

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
