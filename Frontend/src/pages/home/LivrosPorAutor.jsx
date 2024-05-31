import React from 'react';
import {useFetch} from "../../useFetch";
import Row from 'react-bootstrap/Row';
import Book from '../search/book';
import './LivrosPorAutor.css';
import bookAutor from "../../images/bookAutor.jpg";

function LivrosPorAutor({ autor }) {
    const {data} = useFetch();
    const BOOKS = data.books;

    const livrosDoAutor = BOOKS.filter(item => item.authors.includes(autor)); // Filtra os livros pelo autor especificado

    return (
        <div>
            <div className={"box"} style={{backgroundImage: `url(${bookAutor})`}}>
                <h2 className='TituloA'>Livros de {autor}</h2>
            </div>
            <Row className="caixa_grande">
                {livrosDoAutor.map((livro) => (
                    <Book key={livro.id} livro={livro} />) // Add closing parenthesis here
                )}
            </Row>
        </div>
    );
}
export default LivrosPorAutor;