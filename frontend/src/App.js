import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar'
import FrontPage from './components/FrontPage';

function App() {
  return (
    <div>
      <Navbar />
      <h1>Test</h1>
    </div>
  );
}

export default App;
