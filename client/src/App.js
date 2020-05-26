import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/PrivateRoute';
import GameList from './components/GameList';
import GameView from './components/GameView';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/list" component={GameList} />
          <PrivateRoute exact path="/game/:id" component={GameView} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
