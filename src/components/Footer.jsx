import React from 'react';
import './Footer.css'; 
import logo from '../images/book_logo.png';

function Footer() {
  return (
    <footer className='footer'>
      <div id="logo">
          <img src={logo} alt="BookStore" style={{ width: '100px', height: 'auto', background: 'none' }} />
          <div id="titulo">
          <h1 style={{ color: 'black' }}>BookStore</h1>
            <p id="segundo">© 2024, BookStore Inc. All rights reserved</p>
          </div>
        </div>
    </footer>
  );
}

export default Footer;