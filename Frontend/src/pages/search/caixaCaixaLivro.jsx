import React, { useContext, useState, useEffect } from 'react';
import './caixaCaixaLivroStyle.css';
import { ShopContext } from '../../context/shop-context';
import Book from "./book";
import Row from 'react-bootstrap/Row';
import { useFetch } from "../../useFetch";

export default function CaixaCaixaLivro({ scoreFiltro, priceFiltro, OrderSelecionada, input, categoriaSelecionada, autorValue, categoriaValue }) {
  const { data } = useFetch();
  const BOOKS = data.books;

  const { updateTotalBooksLength, first, last } = useContext(ShopContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(BOOKS);
  }, [BOOKS]);

  let BooksFiltrados = [...books];

  BooksFiltrados = BooksFiltrados.map(book => ({
    ...book,
    price: typeof book.price === 'number' ? book.price : 0
  }));

  if (scoreFiltro && scoreFiltro.min !== undefined && scoreFiltro.max !== undefined) {
    BooksFiltrados = BooksFiltrados.filter(book => book.score >= scoreFiltro.min && book.score <= scoreFiltro.max);
  }

  if (priceFiltro && priceFiltro.min !== undefined && priceFiltro.max !== undefined) {
    BooksFiltrados = BooksFiltrados.filter(book => book.price >= priceFiltro.min && book.price <= priceFiltro.max);
  }

  if (autorValue && autorValue.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => book.authors.includes(autorValue));
  }

  if (categoriaValue && categoriaValue.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => book.categories.some(category => category.toLowerCase().includes(categoriaValue.toLowerCase())));
  }

  if (categoriaSelecionada === 'autor' && input && input.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => book.authors.includes(input));
    console.log(BooksFiltrados);
  }

  if (categoriaSelecionada === 'titulo' && input && input.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => book.title.toLowerCase().includes(input.toLowerCase()));
  }

  if (categoriaSelecionada === 'categoria' && input && input.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => book.categories.some(category => category.toLowerCase().includes(input.toLowerCase())));
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
  console.log(books_mostrar);

  return (
      <Row className="caixa_grande">
        {books_mostrar.map((b, index) => (
            <Book key={index} livro={b} />
        ))}
      </Row>
  );
}
