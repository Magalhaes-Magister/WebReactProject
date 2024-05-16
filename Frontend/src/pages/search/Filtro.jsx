import React, { useContext, useState } from 'react';
import './Filtro.css';
import db from '../../db.json';
import { ShopContext } from '../../context/shop-context';

function Filtro({}) {
    const { handleAutorChange, handleCategoriasChange, handlePriceFiltro, handleScoreFiltro } = useContext(ShopContext);
    const [showDropDown , setShowDropDown] = useState(false);
    const [showCategoriaDropdown, setShowCategoriaDropdown] = useState(false);
    const [showAutorDropdown, setShowAutorDropdown] = useState(false);
    const [showRankingDropdown, setShowRankingDropdown] = useState(false);
    const [showPrecoDropdown, setShowPrecoDropdown] = useState(false);

    const autores = db.books.reduce((acc, book) => {
        book.authors.forEach((autor) => {
            if (!acc.includes(autor)) {
                acc.push(autor);
            }
        });
        return acc;
    }, []);

    const categoriasList = db.books.reduce((acc, book) => {
        book.categories.forEach((categoria) => {
            if (!acc.includes(categoria)) {
                acc.push(categoria);
            }
        });
        return acc;
    }, []);

    return (
        <div className="filtro">
            <div className="Botao_filtro">
                <button className="Botao_Principal"onClick={() => setShowDropDown(!showDropDown)}>Filtros</button>
                <div className="Botao_drop">
                    <div className="Botao_segundario">
                        <a href="#" onClick={() => setShowCategoriaDropdown(!showCategoriaDropdown)}>Categoria</a>
                        {showCategoriaDropdown && (
                            <div className="Botao_segundario_conteudo">
                                {categoriasList.map((categoria, index) => (
                                    <a key={`categoria_${index}`} href="#" onClick={() => handleCategoriasChange(categoria)}>{categoria}</a>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="Botao_segundario">
                        <a href="#" onClick={() => setShowAutorDropdown(!showAutorDropdown)}>Autor</a>
                        {showAutorDropdown && (
                            <div className="Botao_segundario_conteudo">
                                {autores.map((autor, index) => (
                                    <a key={`autor_${index}`} href="#" onClick={() => handleAutorChange(autor)}>{autor}</a>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="Botao_segundario">
                        <a href="#" onClick={() => setShowRankingDropdown(!showRankingDropdown)}>Ranking</a>
                        {showRankingDropdown && (
                            <div className="Botao_segundario_conteudo">
                                <a href="#" onClick={() => handleScoreFiltro(0, 1)}>0-1</a>
                                <a href="#" onClick={() => handleScoreFiltro(1, 2)}>1-2</a>
                                <a href="#" onClick={() => handleScoreFiltro(2, 3)}>2-3</a>
                                <a href="#" onClick={() => handleScoreFiltro(3, 4)}>3-4</a>
                                <a href="#" onClick={() => handleScoreFiltro(4, 5)}>4-5</a>
                            </div>
                        )}
                    </div>
                    <div className="Botao_segundario">
                        <a href="#" onClick={() => setShowPrecoDropdown(!showPrecoDropdown)}>Preço</a>
                        {showPrecoDropdown && (
                            <div className="Botao_segundario_conteudo">
                                <a href="#" onClick={() => handlePriceFiltro(0, 10)}>0-10</a>
                                <a href="#" onClick={() => handlePriceFiltro(10, 20)}>10-20</a>
                                <a href="#" onClick={() => handlePriceFiltro(20, 30)}>20-30</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filtro;
