import React from 'react';
import AppNavbar from './components/AppNavbar';
import GameList from './components/GameList';
import GameModal from './components/GameModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <GameModal />
          <GameList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
