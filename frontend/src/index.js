import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Click from './components/Click'
import Navbar from './components/common/Navbar';
import About from './components/About';
import reportWebVitals from './reportWebVitals';
import Store from './components/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="container mb-5">
        <Routes>
          <Route exact path="/" element={<App/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/click" element={<Click/>} />
          <Route path="/store" element={<Store/>} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
