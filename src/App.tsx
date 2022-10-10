import React from 'react';
import { Auth0Component } from './features/auth0/auth0';
import { Home } from './features/homepage/Home';
import Sidebar from './features/sidebar/Sidebar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <header className="App-header">
        {window.localStorage.getItem('refreshToken') ? <Home /> : <Auth0Component />}
      </header>
    </div>
  );
}

export default App;
