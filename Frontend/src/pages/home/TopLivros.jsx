import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Book from '../search/book';
import './TopLivros.css';
import bookAutor from "../../images/bookAutor.jpg";
import {useFetch} from "../../fetch/useFetch";

function TopLivros() {
    const {data, error} = useFetch();
    const books = data.books
    const [topLivros, setTopLivros] = useState([]);
    const livros = books.filter(item => item.score === 5).slice(0, 5);
    setTopLivros(livros);
/*
    const fetchData = async () => {
        try {
            const data = await fetchBooks();
            const topLivros = data.filter(item => item.score === 5).slice(0, 5);
            setTopLivros(topLivros);
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

 */

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
