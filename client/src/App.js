import React, { Component } from 'react';
import Register from './components/auth/Register';
import AppNavbar from './components/AppNavbar';
import GameList from './components/GameList';
import GameView from './components/GameView';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Router>
            <Route exact path="/" component={Register} />
            <Route exact path="/games" component={GameList} />
            <Route exact path="/game/:id" component={GameView} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
