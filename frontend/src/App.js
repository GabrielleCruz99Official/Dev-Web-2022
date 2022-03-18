import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api')
    .then((res) => res.json())
    .then((data) => setData(data.message))
    .catch(err => {console.log("Loading error.")});
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-light">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/register">Register</a>
      </nav>
      <div>
        <h1>Hello!</h1>
        <h2>{!data ? "Loading..." : data}</h2>
      </div>
    </div>
  );
}

export default App;
