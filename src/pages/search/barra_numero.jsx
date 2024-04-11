import React, { useContext } from 'react';
import './barra_numero.css';
import { ShopContext } from "../../context/shop-context";

function BarraNumero( ) {
  const { totalPaginas, clickedNumber, handlePrimeiraPagina, handleClick, handleNextClick, start, end } = useContext(ShopContext);
  return (
    <ul id="barra">
      <li id="next" onClick={handlePrimeiraPagina}>First</li>
      {Array.from({ length: totalPaginas }, (_, index) => {
        const numero = start + index + 1; 
        return (
          <li
            className={`numeros_iniciais ${clickedNumber === numero ? 'active' : ''}`}
            key={numero}
            onClick={() => handleClick(numero)}
          >
            {numero}
          </li>
        );
      })}
      {end < totalPaginas && <li id="pontos">...</li>}
      {end !== totalPaginas && (
        <li
          className={`numeros_iniciais ${clickedNumber === totalPaginas ? 'active' : ''}`}
          onClick={() => handleClick(totalPaginas)}
        >
          {totalPaginas}
        </li>
      )}
      <li id="next" onClick={handleNextClick}>Next</li>
    </ul>
  );
}

export default BarraNumero;
