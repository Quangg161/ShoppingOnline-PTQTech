import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import '../css/Main.css';
import logo from '../img/logo.png';  // Import logo từ đường dẫn tương đối

class Main extends Component {
  render() {
    return (
      <div className="body-customer">
        <header className="header-container">
          <div className="header-logo">
            <img src={logo} alt="Logo" className="logo" />
            <span className="site-name">PTQ Tech</span>
          </div>
          <div className="menu-container">
            <Menu />
          </div>
        </header>
        <div className="inform-container">
          <Inform />
        </div>
        <div className="content-container">
          <Routes>
            <Route path='/' element={<Navigate replace to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/product/category/:cid' element={<Product />} />
            <Route path='/product/search/:keyword' element={<Product />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/active' element={<Active />} />
            <Route path='/login' element={<Login />} />
            <Route path='/myprofile' element={<Myprofile />} />
            <Route path='/mycart' element={<Mycart />} />
            <Route path='/myorders' element={<Myorders />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default Main;


