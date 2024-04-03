import React, { useEffect } from 'react';
import './caixaCaixaLivroStyle.css';
import CaixaLivro from './caixaLivro';
import db from '../db.json';

export default function CaixaCaixaLivro({ start, end, scoreFiltro, priceFiltro, input, categoriaSelecionada, setBooksMostrar }) {
  let BooksFiltrados = db.books;

  if (scoreFiltro.min !== undefined && scoreFiltro.max !== undefined) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.score >= scoreFiltro.min && book.score <= scoreFiltro.max;
    });
  }

  if (categoriaSelecionada === 'autor' && input && input.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.authors.includes(input);
    });
  }


  if (categoriaSelecionada === 'titulo' && input && input.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.title.toLowerCase().includes(input.toLowerCase());
    });
  }

  if (categoriaSelecionada === 'categoria' && input && input.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.categories.some(category => category.toLowerCase().includes(input.toLowerCase()));
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
