import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} alt={item.name} /></Link>
            <figcaption>{item.name}<br />Price: {item.price}</figcaption>
          </figure>
        </div>
      );
    });

    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} alt={item.name} /></Link>
            <figcaption>{item.name}<br />Price: {item.price}</figcaption>
          </figure>
        </div>
      );
    });

    return (
      <div>
        <div className="align-center">
          <h2>NEW PRODUCTS</h2>
          <div className="product-grid">
            {newprods}
          </div>
        </div>

        {this.state.hotprods.length > 0 && (
          <div className="align-center">
            <h2>HOT PRODUCTS</h2>
            <div className="product-grid">
              {hotprods}
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      this.setState({ newprods: res.data });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      this.setState({ hotprods: res.data });
    });
  }
}

export default Home;
