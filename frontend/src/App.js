import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Store from './components/storepage/Store';
import FrontPage from './components/frontpage/FrontPage';
import UserHub from './components/userpage/UserHub';
import Login from './components/userpage/Login';
import Register from './components/userpage/Register';
import Checkout from './components/storepage/Checkout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<FrontPage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/store" element={<Store/>} />
        <Route path="/users" element={<UserHub/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<FrontPage/>} />
        <Route path="/demo" element={<FrontPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </div>
  );
}

export default App;