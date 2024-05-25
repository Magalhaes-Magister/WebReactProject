import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../../books';
import Row from 'react-bootstrap/Row';
import Book from '../search/book';
import './TopLivros.css';
import bookAutor from "../../images/bookAutor.jpg";

function TopLivros() {
    const [topLivros, setTopLivros] = useState([]);

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
