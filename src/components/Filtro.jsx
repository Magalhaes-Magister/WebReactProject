import React from 'react';
import './Filtro.css';

function Filtro({ setScoreFilter, setPriceFilter }) {

    const handleScoreFilter = (min, max) => {
        setScoreFilter({ min, max });
    };

    const handlePriceFilter = (min, max) => {
        setPriceFilter({ min, max });
    };

    return (
        <div className="filtro">
            <div className="Botao_filtro">
                <button className="Botao_Principal">Ordenar Por</button>
                <div className="Botao_drop">
                    <div className="Botao_segundario">
                        <a href="">Ranking</a>
                        <div className="Botao_segundario_conteudo">
                            <a href="" onClick={() => handleScoreFilter(0, 1)}>0-1</a>
                            <a href="" onClick={() => handleScoreFilter(1, 2)}>1-2</a>
                            <a href="" onClick={() => handleScoreFilter(2, 3)}>2-3</a>
                            <a href="" onClick={() => handleScoreFilter(3, 4)}>3-4</a>
                            <a href="" onClick={() => handleScoreFilter(4, 5)}>4-5</a>
                        </div>
                    </div>
                    <div className="Botao_segundario">
                        <a href="">Preço</a>
                        <div className="Botao_segundario_conteudo">
                            <a href="" onClick={() => handlePriceFilter(0, 10)}>0-10</a>
                            <a href="" onClick={() => handlePriceFilter(10, 20)}>10-20</a>
                            <a href="" onClick={() => handlePriceFilter(20, 30)}>20-30</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filtro;
