import React from 'react';
import './barra_numero.css';

function barra_numero() {
  return (
    <div className="barra_numero">
        <ul id="barra">
            <li id="numeros_iniciais">1</li>
            <li id="numeros_iniciais">2</li>
            <li id="numeros_iniciais">3</li>
            <li id="numeros_iniciais">4</li>
            <li id="numeros_iniciais">5</li>
            <li id="numeros_iniciais">6</li>
            <li id="numeros_iniciais">7</li>
            <li id="numeros_iniciais">8</li>
            <li>...</li>
            <li id="numero_final">15</li>
            <li id="next">Next</li>
        </ul>
    </div>
  );
}

export default barra_numero;