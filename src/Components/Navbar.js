import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faUser, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import img from '../assest/img/logo.png';

function Navbar({ isAuthenticated }) {
  const favorites = useSelector(state => state.favorites);
  const cart = useSelector(state => state.cart);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark text-light py-2">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={img} alt="NYX" style={{width: '150px', height: 'auto'}}/>
        </Link>
        <button
          className="navbar-toggler text-light"
          type="button"
          onClick={toggleCollapse}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className={`${collapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/products">Products</Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link className="nav-link navbar-brand text-danger me-3" to="/favorites">
              <FontAwesomeIcon icon={faHeart}  style={{ fontSize: '1rem' }} title="Favorites"/> {favorites.length}
            </Link>
            <Link className="nav-link navbar-brand  text-light me-3" to="/cart">
              <FontAwesomeIcon icon={faShoppingCart}  style={{ fontSize: '1rem' }} title="Cart"/> {cart.length}
            </Link>
            {isAuthenticated ? (
              <>
                
                <button className="nav-link navbar-brand me-3 text-light" title="Logout" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt}  style={{ fontSize: '1rem' }} />
                </button>
                <span className="nav-link navbar-brand me-3 text-light" title="User Name">{userData.username}</span>
              </>
            ) : (
              <Link className="nav-link navbar-brand me-3 text-light" to="/login">
                <FontAwesomeIcon icon={faUser}  style={{ fontSize: '1rem' }}/>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
