import React from 'react';
import './caixaCaixaLivroStyle.css';
import CaixaLivro from './caixaLivro';
import db from '../db.json';

export default function CaixaCaixaLivro({ start, end, scoreFiltro, priceFiltro, input, categoriaSelecionada }) {
  let BooksFiltrados = db.books;
  
  // Filtro pelo score
  if (scoreFiltro.min !== undefined && scoreFiltro.max !== undefined) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.score >= scoreFiltro.min && book.score <= scoreFiltro.max;
    });
  }

  // Filtro pelo autor
  if (categoriaSelecionada === 'autor' && input && input.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.authors.includes(input);
    });
  }

  // Filtro pelo título
  if (categoriaSelecionada === 'titulo' && input && input.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.title.toLowerCase().includes(input.toLowerCase());
    });
  }

  // Filtro pela categoria
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