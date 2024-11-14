import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import { FaShoppingCart } from 'react-icons/fa';  // Import icon giỏ hàng
import '../css/Inform.css';

class Inform extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          {this.context.token === '' ?
            <div>
              <NavLink to='/login' className="border-bottom">Login</NavLink> | 
              <NavLink to='/signup' className="border-bottom">Sign-up</NavLink> | 
              <NavLink to='/active' className="border-bottom">Active</NavLink>
            </div>
            :
            <div>
              Hello <b className="border-bottom">{this.context.customer.name}</b> |
              <Link to='/login' className="border-bottom logout-link" onClick={() => this.lnkLogoutClick()}>Logout</Link> |
              <NavLink to='/myprofile' className="border-bottom">My profile</NavLink> |
              <NavLink to='/myorders' className="border-bottom">My orders</NavLink>
            </div>
          }
        </div>
        <div className="float-right">
          <NavLink to='/mycart' className="border-bottom cart-link">
            My cart <FaShoppingCart />
          </NavLink>
          <span className="have-items">have <b className="border-bottom">{this.context.mycart.length}</b> items</span>
        </div>
        <div className="float-clear" />
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;
