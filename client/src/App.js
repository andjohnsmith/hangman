import React from 'react';
import AppNavbar from './components/AppNavbar';
import GameList from './components/GameList';
import GameModal from './components/GameModal';
import GameView from './components/GameView';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Router>
          <Route path="/" exact>
            <Container>
              <GameModal />
              <GameList />
            </Container>
          </Route>
          <Route exact path="/game/:id" component={GameView} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
