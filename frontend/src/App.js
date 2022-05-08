import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Store from './components/Store';
import FrontPage from './components/frontpage/FrontPage';
import UserHub from './components/userpage/UserHub';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<FrontPage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/store" element={<Store/>} />
        <Route path="/users" element={<UserHub/>} />
        <Route path="/contact" element={<FrontPage/>} />
        <Route path="/demo" element={<FrontPage/>} />
      </Routes>
    </div>
  );
}

export default App;
