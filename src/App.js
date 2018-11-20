import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Register from './components/Register';
import Signin from './components/Signin';


import './App.css';

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/signin" component={Signin}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/profile/:id" component={Profile}></Route>
            
            <Route path="/*" component={Home}></Route>

          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
