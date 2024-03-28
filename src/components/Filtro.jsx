import React from 'react';
import './Filtro.css';

function filtro() {
    return (
        <div className="filtro">
            <div className="Botao_filtro">
                <button className="Botao_Principal">Ordenar Por</button>
                <div className="Botao_drop">
                    <div className="Botao_segundario">
                        <a href="#">Ranking</a>
                        <div className="Botao_segundario_conteudo">
                            <a href="#">0-1</a>
                            <a href="#">1-2</a>
                            <a href="#">2-3</a>
                            <a href="#">3-4</a>
                            <a href="#">4-5</a>
                        </div>
                    </div>
                    <div className="Botao_segundario">
                        <a href="#">Preço</a>
                        <div className="Botao_segundario_conteudo">
                            <a href="#">0-10</a>
                            <a href="#">10-20</a>
                            <a href="#">20-30</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default filtro;
