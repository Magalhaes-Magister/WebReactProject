import React, { useState, useEffect } from 'react';
import './barra_numero.css';
<<<<<<< HEAD:src/components/barra_numeros.jsx
import db from '../db.json';
import CaixaCaixaLivro from './caixaCaixaLivro';
import Filtro from './Filtro';
=======
import db from '../../db.json';
import CaixaCaixaLivro from '../../components/caixaCaixaLivro';
>>>>>>> 611da071c5315a2ea57399751f872c80062bb2a3:src/pages/search/barra_numeros.jsx

function BarraNumero() {
  const totalBooks = db.books.length;
  const booksPorPagina = 5;
  const totalPaginas = Math.ceil(totalBooks / booksPorPagina);

  const [Pagina_Atual, setPagina_Atual] = useState(1);
  const [clickedNumber, setClickedNumber] = useState('');
  const [scoreFiltro, setscoreFiltro] = useState({ min: 0, max: 5 });
  const [priceFiltro, setpriceFiltro] = useState({ min: 0, max: 30 });

  useEffect(() => {
    setPagina_Atual(1);
    setClickedNumber(1);
  }, [totalPaginas]);

  const handleClick = (number) => {
    setPagina_Atual(number);
    setClickedNumber(number);
  };

  const handlePrimeiraPagina = () => {
    setPagina_Atual(1);
    setClickedNumber(1);
  };

  const handleProximaPagina = () => {
    const ProximaPagina = Pagina_Atual + 1;
    if (ProximaPagina <= totalPaginas) {
      setPagina_Atual(ProximaPagina);
      setClickedNumber(ProximaPagina);
    }
  };

  const CalculoStartEndIndex = () => {
    let start;
    let end;
    if (clickedNumber >= 2 && clickedNumber <= totalPaginas - 4) {
      start = clickedNumber - 1;
      end = clickedNumber + 3;
    } else if (clickedNumber > totalPaginas - 4) {
      start = totalPaginas - 4;
      end = totalPaginas;
    } else {
      start = 1;
      end = 5;
    }
    return { start, end };
  };

  const CalculoStartEndLivro = () => {
    const start_book = (Pagina_Atual - 1) * booksPorPagina + 1;
    const end_book = Pagina_Atual * booksPorPagina;
    return { start_book, end_book };
  };

  const { start, end } = CalculoStartEndIndex();
  const { start_book, end_book } = CalculoStartEndLivro();

  return (
    <div className="barra_numero">
      <Filtro setscoreFiltro={setscoreFiltro} setpriceFiltro={setpriceFiltro} />
      <CaixaCaixaLivro start={start_book} end={end_book} scoreFiltro={scoreFiltro} priceFiltro={priceFiltro} />
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
    </div>
  );
}

export default BarraNumero;
