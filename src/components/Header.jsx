import React from 'react';
import '../Header.css'; 
import logo from '../imagens/logo_site.png';
import shoppingCar from '../imagens/ShoppingCar.png';

function Header() {
  return (
    <div className="PaginaInicial">
      <div className="header">
        <div id="logo">
          <img src={logo} alt="Biblioteca de Livros" style={{ width: '100px', height: 'auto', background: 'none' }} />
        </div>
        <div id="filter">
          <input type="text" placeholder="Search..." />
          <button>Filtrar</button> {/* Botão de filtro */}
        </div>
        <div id="menu">
          <ul>
            <img src={shoppingCar} alt="" style={{ width: '50px', height: 'auto', background: 'none' }} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
