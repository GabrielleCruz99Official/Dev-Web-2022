import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import WithNavbar from './components/utils/WithNavbar';
import WithoutNavbar from './components/utils/WithoutNavbar';
import WithAdminNavbar from './components/utils/WithAdminNavbar';
import Store from './components/storepage/Store';
import FrontPage from './components/frontpage/FrontPage';
import UserHub from './components/userpage/UserHub';
import Login from './components/userpage/Login';
import Register from './components/userpage/Register';
import Basket from './components/storepage/Basket';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUserList from './components/admin/AdminUserList';
import AdminProductsList from './components/admin/products/AdminProductList';
import NotFound from './components/utils/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<WithoutNavbar/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
        </Route>
        <Route element={<WithNavbar/>}>
          <Route exact path="/" element={<FrontPage/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/users" element={<UserHub/>} />
          <Route path="/contact" element={<NotFound/>} />
          <Route path="/payment" element={<NotFound/>} />
          <Route path="/basket" element={<Basket/>} />        
        </Route>
        <Route element={<WithAdminNavbar/>}>
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/admin/users" element={<AdminUserList/>} />
          <Route path="/admin/products" element={<AdminProductsList/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
