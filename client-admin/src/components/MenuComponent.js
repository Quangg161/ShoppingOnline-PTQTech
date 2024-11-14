import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import '../css/Menu.css';

class Menu extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar-header">
        <div className="user-section">
          <img src={`${process.env.PUBLIC_URL}/Logo.jpg`} alt="Logo PTQ Tech" />
          <span className="website-name">PTQ TECH</span>
        </div>
        </div>
        <nav className="sidebar-nav">
          <ul className="menu-list">
          <li className="menu-item">
            <NavLink to="/admin/home" className="menu-link" activeClassName="active">Home</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/admin/category" className="menu-link" activeClassName="active">Category</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/admin/product" className="menu-link" activeClassName="active">Product</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/admin/order" className="menu-link" activeClassName="active">Order</NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/admin/customer" className="menu-link" activeClassName="active">Customer</NavLink>
          </li>
          </ul>
        </nav>
      </div>
    );
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}

export default Menu;
