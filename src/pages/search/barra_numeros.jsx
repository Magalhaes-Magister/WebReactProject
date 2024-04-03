import React, { useState } from 'react';
import './barra_numero.css';
import db from '../../db.json';
import CaixaCaixaLivro from '../../components/caixaCaixaLivro';

function BarraNumero() {
  const totalBooks = db.books.length;
  const booksPerPage = 5;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [clickedNumber, setClickedNumber] = useState('');

  const handleClick = (number) => {
    setCurrentPage(number);
    setClickedNumber(number);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    setClickedNumber(1);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
      setClickedNumber(nextPage);
    }
  };

  const calculateStartEndIndexes = () => {
    let start;
    let end;
    if (clickedNumber >= 2 && clickedNumber <= totalPages - 4) {
      start = clickedNumber - 1;
      end = clickedNumber + 3;
    } else if (clickedNumber > totalPages - 4) {
      start = totalPages - 4;
      end = totalPages;
    } else {
      start = 1;
      end = 5;
    }
    return { start, end };
  };

  const calculateStartEndLivro = () => {
    const start_livro = (currentPage - 1) * booksPerPage + 1;
    const end_livro = currentPage * booksPerPage;
    return { start_livro, end_livro };
  }

  const { start, end } = calculateStartEndIndexes();
  const {start_livro, end_livro} = calculateStartEndLivro();

  return (
    <div className="barra_numero">
      <CaixaCaixaLivro start={start_livro} end={end_livro} />
      <ul id="barra">
        <li id="next" onClick={handleFirstPage}>First</li>
        {Array.from({ length: Math.ceil(totalPages) }, (_, index) => (
          <li
            className={`numeros_iniciais ${clickedNumber === index + 1 ? 'active' : ''}`}
            key={index + 1}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </li>
        )).slice(start - 1, end)}
        <li id="numero_final">{totalPages}</li>
        <li id="next" onClick={handleNextPage}>Next</li>
      </ul>

    </div>
  );
}

export default BarraNumero;

