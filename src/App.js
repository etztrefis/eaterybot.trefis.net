import React from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import HomePage from "./HomePage.js"

import "./App.css"

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage}/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
