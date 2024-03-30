import React from 'react';
import './caixaCaixaLivroStyle.css';
import CaixaLivro from './caixaLivro';
import db from '../db.json';

export default function CaixaCaixaLivro({ start, end }) {
  const books = db.books.slice(start - 1, end);

  return (
    <>
      <div className="caixa_grande">
        {books.map((b, index) => (
          <CaixaLivro key={index} livro={b} />
        ))}
      </div>
    </>
  );
}
