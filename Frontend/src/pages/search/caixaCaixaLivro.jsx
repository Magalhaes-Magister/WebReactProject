import React, { useContext, useState, useEffect } from 'react';
import './caixaCaixaLivroStyle.css';
import { ShopContext } from '../../context/shop-context';
import { fetchBooks } from '../../books'; // Importe a função fetchBooks
import Book from "./book";
import Row from 'react-bootstrap/Row';

export default function CaixaCaixaLivro({ scoreFiltro, priceFiltro, OrderSelecionada, input, categoriaSelecionada, autorValue, categoriaValue }) {
  const { updateTotalBooksLength, first, last } = useContext(ShopContext);
  const [booksData, setBooksData] = useState([]); // Estado para armazenar os dados dos livros

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = await fetchBooks(); // Busca os dados dos livros
        setBooksData(books); // Atualiza o estado com os dados dos livros
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    fetchData(); // Chama a função fetchData ao montar o componente
  }, []); // O array de dependências está vazio, então o useEffect só será executado uma vez, ao montar o componente

  let BooksFiltrados = booksData; // Use os dados dos livros armazenados no estado

  BooksFiltrados = BooksFiltrados.map(book => ({
    ...book,
    price: typeof book.price === 'number' ? book.price : 0
  }));

  if (scoreFiltro && scoreFiltro.min !== undefined && scoreFiltro.max !== undefined) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.score >= scoreFiltro.min && book.score <= scoreFiltro.max;
    });
  }

  if (priceFiltro && priceFiltro.min !== undefined && priceFiltro.max !== undefined) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.price >= priceFiltro.min && book.price <= priceFiltro.max;
    });
  }

  if (autorValue && autorValue.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.authors.includes(autorValue);
    });
  }

  if (categoriaValue && categoriaValue.length > 0) {
    BooksFiltrados = BooksFiltrados.filter(book => {
      return book.categories.some(category => category.toLowerCase().includes(categoriaValue.toLowerCase()));
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

  return (
    <Row className="caixa_grande">
      {books_mostrar.map((b, index) => (
        <Book key={index} livro={b} />
      ))}
    </Row>
  );
}
