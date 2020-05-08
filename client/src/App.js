import React from 'react';
import AppNavbar from './components/AppNavbar';
import GameList from './components/GameList';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <GameList />
      </div>
    </Provider>
  );
}

export default App;
