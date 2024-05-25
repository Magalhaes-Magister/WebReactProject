import React, { useContext, useState , useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Book from '../search/book';
import './LivrosPorAutor.css';
import bookAutor from "../../images/bookAutor.jpg";
import { fetchBooks } from '../../books';

function LivrosPorAutor({ autor }) {
    const [livrosDoAutor, setLivrosDoAutor] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchBooks();
            const livros = data.filter(item => item.authors.includes(autor));
            setLivrosDoAutor(livros);
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
                <h2 className='TituloA'>Livros de {autor}</h2>
            </div>
            <Row className="caixa_grande">
                {livrosDoAutor.map((livro) => (
                    <Book key={livro.id} livro={livro} />
                ))}
            </Row>
        </div>
    );
}

export default LivrosPorAutor;
