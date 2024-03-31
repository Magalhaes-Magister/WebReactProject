import React from 'react';
import './caixaCaixaLivroStyle.css';
import CaixaLivro from './caixaLivro';
import db from '../db.json';

export default function CaixaCaixaLivro({ start, end, scoreFiltro, priceFiltro }) {
  const BooksFiltrados = db.books.filter(book => {
    const Intervalo_score = book.score >= scoreFiltro.min && book.score <= scoreFiltro.max;
    //const priceInRange = book.price >= priceFiltro.min && book.price <= priceFiltro.max;
    return Intervalo_score;
  });

  const books_mostrar = BooksFiltrados.slice(start - 1, end);

  return (
    <>
      <div className="caixa_grande">
        {books_mostrar.map((b, index) => (
          <CaixaLivro key={index} livro={b} />
        ))}
      </div>
    </>
  );
}
