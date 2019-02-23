import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import { BrowserRouter, Route } from 'react-router-dom';

import User from './Container/User/User';
import LoginForm from './Container/Login/Login';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Route path='/' exact component={LoginForm}/>
            <Route path='/users' exact component={User}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
