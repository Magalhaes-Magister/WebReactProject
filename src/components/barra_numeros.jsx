import React, { useState } from 'react';
import './barra_numero.css';
import db from '../db.json';

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

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`numeros_iniciais ${clickedNumber === i ? 'active' : ''}`}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      );
    }

    let startIndex;
    let endIndex;
    if (clickedNumber >= 2 && clickedNumber <= totalPages - 4) {
      startIndex = clickedNumber - 1;
      endIndex = clickedNumber + 3;
    } else if (clickedNumber > totalPages - 4) {
      startIndex = totalPages - 4;
      endIndex = totalPages;
    } else {
      startIndex = 1;
      endIndex = 5;
    }

    return pageNumbers.slice(startIndex - 1, endIndex);
  };

  return (
    <div className="barra_numero">
      <ul id="barra">
        <li id="next" onClick={handleFirstPage}>First</li>
        {renderPageNumbers()}
        <li>...</li>
        <li id="numero_final">{totalPages}</li>
        <li id="next" onClick={handleNextPage}>Next</li>
      </ul>
    </div>
  );
}

export default BarraNumero;
