import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Category from './CategoryComponent';
import Product from './ProductComponent';
import Order from './OrderComponent';
import Customer from './CustomerComponent';
import '../css/Main.css';

class Main extends Component {
  static contextType = MyContext;
  render() {
    if (this.context.token !== '') {
      return (
        <div className="admin-layout">
          <div className="sidebar">
            <div className="sidebar-header">
              <h1 className="admin-title">Admin Panel</h1>
            </div>
            <Menu />
          </div>
          <div className="main-content">
            <div className="top-bar">
              <div className="breadcrumb">Dashboard</div>
              <div className="user-info">
                Welcome, {this.context.username}
                <button className="btn btn-secondary btn-sm" onClick={() => this.context.setToken('')}>Logout</button>
              </div>
            </div>
            <div className="content-wrapper">
              <Routes>
                <Route path='/admin' element={<Navigate replace to='/admin/home' />} />
                <Route path='/admin/home' element={<Home />} />
                <Route path='/admin/category' element={<Category />} />
                <Route path='/admin/product' element={<Product />} />
                <Route path='/admin/order' element={<Order />} />
                <Route path='/admin/customer' element={<Customer />} />
              </Routes>
            </div>
          </div>
        </div>
      );
    }
    return (<div />);
  }
}
export default Main;