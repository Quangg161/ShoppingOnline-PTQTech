import { useLocation, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../css/Menu.css';

function Menu() {
  const [categories, setCategories] = useState([]);
  const [txtKeyword, setTxtKeyword] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    apiGetCategories();
  }, []);

  const apiGetCategories = () => {
    axios.get('/api/customer/categories').then((res) => {
      setCategories(res.data);
    });
  };

  const btnSearchClick = (e) => {
    e.preventDefault();
    // Điều hướng đến trang tìm kiếm mà không tải lại trang
    navigate(`/product/search/${txtKeyword}`);
  };

  return (
    <div className="menu-container border-bottom">
      <ul className="menu-list">
        <li className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Link to="/" className="menu-link">Home</Link>
        </li>
        {categories.map((item) => {
          const isActive = location.pathname.includes(item._id);
          return (
            <li key={item._id} className={`menu-item ${isActive ? 'active' : ''}`}>
              <Link to={`/product/category/${item._id}`} className="menu-link">
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <form className="search" onSubmit={btnSearchClick}>
        <input
          type="search"
          placeholder="Enter keyword"
          className="keyword"
          value={txtKeyword}
          onChange={(e) => setTxtKeyword(e.target.value)}
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default Menu;
