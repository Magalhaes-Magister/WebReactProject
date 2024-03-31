import React from 'react';
import './Header.css'; 
import logo from '../images/book_logo.png';
import shoppingCar from '../images/car_logo.png';
import {Link} from "react-router-dom";

function Header() {
  const cartCount = 15; 

  return (
    <header className="header">
      <Link id="logo" to="/">
          <img src={logo} alt="BookStore" style={{ width: '100px', height: '100px', background: 'none' }} />
          <div id="titulo">
            <h1 style={{ color: 'black' }}>BookStore</h1>
          </div>
        </Link>
        <Link id="menu" to="/carrinho">
          <ul>
            <img src={shoppingCar} alt="" style={{ width: '80px', height: '80px', background: 'none' }} />
            <span className="cart-count" style={{ borderRadius: '50%', backgroundColor: 'black', color: 'rgb(239, 188, 155)', padding: '8px' }}>{cartCount}</span>
          </ul>
        </Link>
    </header>
  );
}

export default Header;
