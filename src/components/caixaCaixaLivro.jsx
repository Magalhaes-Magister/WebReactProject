import React from 'react';
import './caixaCaixaLivroStyle.css';
import CaixaLivro from './caixaLivro';
import {BOOKS} from '../books'

export default function CaixaCaixaLivro({ start, end }) {

  return (
    <>
      <div className="caixa_grande">
        {BOOKS.map((b, index) => (
          <CaixaLivro key={index} livro={b} />
        ))}
      </div>
    </>
  );
}
