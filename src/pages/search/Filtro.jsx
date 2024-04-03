//import React, { useState } from 'react';
import './Filtro.css';

function Filtro({ setscoreFiltro, setpriceFiltro }) {

    const handleScoreFiltro = (min, max) => {
        setscoreFiltro({ min, max });
    };

    const handlePriceFiltro = (min, max) => {
        setpriceFiltro({ min, max });
    };

    return (
        <div className="filtro">
            <div className="Botao_filtro">
                <button className="Botao_Principal">Filtros</button>
                <div className="Botao_drop">
                    <div className="Botao_segundario">
                        <a href="#">Ranking</a>
                        <div className="Botao_segundario_conteudo">
                            <a href="#" onClick={() => handleScoreFiltro(0, 1)}>0-1</a>
                            <a href="#" onClick={() => handleScoreFiltro(1, 2)}>1-2</a>
                            <a href="#" onClick={() => handleScoreFiltro(2, 3)}>2-3</a>
                            <a href="#" onClick={() => handleScoreFiltro(3, 4)}>3-4</a>
                            <a href="#" onClick={() => handleScoreFiltro(4, 5)}>4-5</a>
                        </div>
                    </div>
                    <div className="Botao_segundario">
                        <a href="#">Preço</a>
                        <div className="Botao_segundario_conteudo">
                            <a href="#" onClick={() => handlePriceFiltro(0, 10)}>0-10</a>
                            <a href="#" onClick={() => handlePriceFiltro(10, 20)}>10-20</a>
                            <a href="#" onClick={() => handlePriceFiltro(20, 30)}>20-30</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Filtro;
