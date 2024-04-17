import React from 'react';
import './caixaCaixaLivroStyle.css';
import db from '../../db.json';
import Book from "./book";
import Row from 'react-bootstrap/Row'

export default function CaixaCaixaLivro({ start, end, scoreFiltro, input, categoriaSelecionada }) {
  let BooksFiltrados = db.books;

  if (scoreFiltro && scoreFiltro.min !== undefined && scoreFiltro.max !== undefined) {
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
  console.log(books_mostrar);
  return (
    <Row className="caixa_grande">
      {books_mostrar.map((b, index) => (
        <Book key={index} livro={b} />
      ))}
    </Row>
  );
}