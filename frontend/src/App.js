import logo from './logo.svg';
import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import FrontPage from './components/FrontPage';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar/>
        <Routes>
          <Route component={<FrontPage/>} path="/" />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
