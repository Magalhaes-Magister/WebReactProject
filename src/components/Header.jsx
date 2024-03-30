import React from 'react';
import './Header.css'; 
import logo from '../imagens/book_logo.png';
import shoppingCar from '../imagens/car_logo.png';
import Carrinho_compra from './carrinho_compra';

function Header() {
  const cartCount = 15; 

  return (
    <header className="header">
      <div id="logo">
          <img src={logo} alt="BookStore" style={{ width: '100px', height: '100px', background: 'none' }} />
          <div id="titulo">
            <h1 style={{ color: 'black' }}>BookStore</h1>
          </div>
        </div>
        <div id="menu">
          <ul id="shopping_cart">
            <img src={shoppingCar} alt="" style={{ width: '80px', height: '80px', background: 'none' }} /> 
            <span className="cart-count" style={{ borderRadius: '50%', backgroundColor: 'black', color: 'rgb(239, 188, 155)', padding: '8px' }}>{cartCount}</span>
            <div className="cart-hover">
              <Carrinho_compra />
            </div>
          </ul>
        </div>
    </header>
  );
}

export default Header;
