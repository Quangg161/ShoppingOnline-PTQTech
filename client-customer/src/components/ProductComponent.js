import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import '../css/Product.css';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
            <figcaption className="text-center">{item.name}<br />Price: {item.price}</figcaption>
          </figure>
        </div>
      );
    });

    return (
      <div className="text-center">
        <h2 className="text-center">LIST PRODUCTS</h2>
        {prods}
      </div>
    );
  }

  componentDidMount() { 
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) { 
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  // API - Get products by category ID
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      let result = res.data;

      // Sắp xếp sản phẩm theo ngày tạo (sản phẩm mới nhất ở đầu)
      result = result.sort((a, b) => new Date(b.cdate) - new Date(a.cdate));
      
      this.setState({ products: result });
    });
  }

  // API - Get products by keyword
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      let result = res.data;

      // Sắp xếp sản phẩm theo ngày tạo
      result = result.sort((a, b) => new Date(b.cdate) - new Date(a.cdate));

      this.setState({ products: result });
    });
  }

  // Phương thức thêm sản phẩm mới vào đầu danh sách
  addProductToList(newProduct) {
    this.setState(prevState => ({
      products: [newProduct, ...prevState.products]
    }));
  }

  // API - Thêm sản phẩm mới (gọi từ form hoặc API khác)
  apiAddProduct(newProduct) {
    axios.post('/api/customer/products', newProduct).then((res) => {
      const result = res.data;
      if (result) {
        this.addProductToList(result); 
      }
    });
  }
}

export default withRouter(Product);
