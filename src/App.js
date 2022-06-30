import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
// import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header> */}
      <Switch>
        <Route path="/ranking" component={ Ranking } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
