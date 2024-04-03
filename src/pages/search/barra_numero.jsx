import React from 'react';
import './barra_numero.css';

function BarraNumero({ totalPaginas, clickedNumber, handleClick, handlePrimeiraPagina, handleProximaPagina, start, end }) {
  return (
    <ul id="barra">
      <li id="next" onClick={handlePrimeiraPagina}>First</li>
      {Array.from({ length: Math.ceil(totalPaginas) }, (_, index) => (
        <li
          className={`numeros_iniciais ${clickedNumber === index + 1 ? 'active' : ''}`}
          key={index + 1}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </li>
      )).slice(start - 1, end)}
      <li id="numero_final">{totalPaginas}</li>
      <li id="next" onClick={handleProximaPagina}>Next</li>
    </ul>
  );
}

export default BarraNumero;
