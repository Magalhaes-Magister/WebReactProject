import React from 'react';
import {useFetch} from "../../books";

import Row from 'react-bootstrap/Row';
import Book from '../search/book';
import './TopLivros.css';
import bookAutor from "../../images/bookAutor.jpg";

function TopLivros() {
    const {data} = useFetch();
    const BOOKS = data.books;

    const topLivros = BOOKS.filter(item => item.score === 5).slice(0, 5); // Filtra os livros com score 5 e limita a 5 livros

    return (
        <div>
            <div className={"box"} style={{backgroundImage: `url(${bookAutor})`}}>
                <h2 className='TituloR'>Top 5 Livros por Ranking</h2>
            </div>
            <Row className="caixa_grande">
                {topLivros.map((livro) => (
                    <Book key={livro.id} livro={livro} />
                ))}
            </Row>
        </div>
    );
}

export default TopLivros;