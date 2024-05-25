import { createContext } from 'react';

export const BooksContext = createContext();

export const fetchBooks = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/books?page=1&limit=100');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os livros:', error);
    throw error;
  }
};


export const fetchAllBooks = async (page, limit) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/books?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os livros:', error);
    throw error;
  }
};

export const fetchBooksByAuthor = async (autor, page, limit) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/books/autor/${autor}?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os livros por autor:', error);
    throw error;
  }
};

export const fetchBooksByYear = async (ano, page, limit) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/books/ano/${ano}?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os livros por ano:', error);
    throw error;
  }
};
