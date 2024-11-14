import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import '../css/Product.css';

class Product extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],   // Lưu toàn bộ sản phẩm
      products: [],      // Sản phẩm hiển thị trên trang hiện tại
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });

    const pagination = (
      <div className="pagination-container">
        {Array.from({ length: this.state.noPages }, (_, index) => {
          if ((index + 1) === this.state.curPage) {
            return (
              <span key={index} className="active">
                <b>{index + 1}</b>
              </span>
            );
          } else {
            return (
              <span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>
                {index + 1}
              </span>
            );
          }
        })}
      </div>
    );

    return (
      <div className="product-container">
        <div className="product-list-wrapper">
          <h2 className="text-center">PRODUCT LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
              {prods}
              <tr>
                <td colSpan="6">{pagination}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        <div className="float-clear" />
      </div>
    );
  }

  componentDidMount() {
    this.apiGetAllProducts();
  }

  updateProducts = (products, noPages, curPage) => {
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }

  lnkPageClick(pageIndex) {
    const { allProducts } = this.state;
    this.setPageProducts(pageIndex, allProducts);
  }

  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  async apiGetAllProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    let page = 1;
    let allProducts = [];
    let noPages = 1;

    while (page <= noPages) {
      const res = await axios.get(`/api/admin/products?page=${page}`, config);
      const result = res.data;
      allProducts = allProducts.concat(result.products); // Gom tất cả sản phẩm
      noPages = result.noPages;
      page += 1;
    }

    const sortedProducts = allProducts.sort((a, b) => new Date(b.cdate) - new Date(a.cdate));

    this.setState({
      allProducts: sortedProducts,
      noPages: Math.ceil(sortedProducts.length / 4),
    });

    this.setPageProducts(1, sortedProducts); // Đặt trang đầu tiên
  }

  setPageProducts(pageIndex, allProducts) {
    const start = (pageIndex - 1) * 4;
    const end = start + 4;
    this.setState({
      products: allProducts.slice(start, end),
      curPage: pageIndex
    });
  }
}

export default Product;
