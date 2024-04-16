import React, { useContext, useState, useEffect } from 'react';
import './caixaCaixaLivroStyle.css';
import { ShopContext } from '../context/shop-context';
import db from '../db.json';
import Book from "./book";
import Row from 'react-bootstrap/Row'

export default function CaixaCaixaLivro({ scoreFiltro,price,OrderSelecionada, input, categoriaSelecionada, autorValue, categoriaValue}) {
  const { updateTotalBooksLength, first, last } = useContext(ShopContext);
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    setBooks([...db.books]);
  }, []);

  let BooksFiltrados = [...books];

  if (scoreFiltro && scoreFiltro.min !== undefined && scoreFiltro.max !== undefined) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.score >= scoreFiltro.min && book.score <= scoreFiltro.max;
    });
  }
  

  if (categoriaSelecionada === 'autor' && input && input.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.authors.includes(input);
    });
    console.log(BooksFiltrados)
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

  
  if (OrderSelecionada === 'maiorScore') {
    BooksFiltrados.sort((a, b) => b.score - a.score); 
  } else if (OrderSelecionada === 'menorScore') {
    BooksFiltrados.sort((a, b) => a.score - b.score); 
  }

  if (OrderSelecionada === 'maiorPrice') {
    BooksFiltrados.sort((a, b) => b.price - a.price); 
  } else if (OrderSelecionada === 'menorPrice') {
    BooksFiltrados.sort((a, b) => a.price - b.price); 
  }

  let books_mostrar = BooksFiltrados.slice(first - 1, last);
  let a = BooksFiltrados.length;
  updateTotalBooksLength(a);
  console.log(books_mostrar)
  return (
    <Row className="caixa_grande">
      {books_mostrar.map((b, index) => (
        <Book key={index} livro={b} />
      ))}
    </Row>
  );
}
