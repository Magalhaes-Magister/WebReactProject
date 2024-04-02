import React from 'react';
import './caixaCaixaLivroStyle.css';
import CaixaLivro from './caixaLivro';
import db from '../db.json';

export default function CaixaCaixaLivro({ start, end, scoreFiltro, priceFiltro, autorCategoria, categoriaSelecionada }) {
  let BooksFiltrados = db.books;
  console.log("autorCategoria:", autorCategoria);
  console.log("categoriaSelecionada:", categoriaSelecionada);
  if (scoreFiltro.min !== undefined && scoreFiltro.max !== undefined) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.score >= scoreFiltro.min && book.score <= scoreFiltro.max;
    });
  }

  if (autorCategoria && autorCategoria.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return autorCategoria.includes(book.authors);
    });
  }

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
