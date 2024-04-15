import React, { useState } from 'react';
import './Filtro.css';
import Escolha from './Escolha';

function Ordenar({ setOrderSelecionada }) {
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleOrderSelecionada = (order) => {
        setOrderSelecionada(order);
        setSelectedFilter(`Preço: ${order}`);
    };

    return (
        <div className="filtro">
            <div className="Botao_filtro">
                <button className="Botao_Principal">Ordenar Por</button>
                <div className="Botao_drop">
                    <div className="Botao_segundario">
                        <a href="#">Ranking</a>
                        <div className="Botao_segundario_conteudo">
                            <a href="#" onClick={() => handleOrderSelecionada('maiorScore')}>Maior</a>
                            <a href="#" onClick={() => handleOrderSelecionada('menorScore')}>Menor</a>
                        </div>
                    </div>
                    <div className="Botao_segundario">
                        <a href="#">Preço</a>
                        <div className="Botao_segundario_conteudo">
                            <a href="#" onClick={() => handleOrderSelecionada('maiorPrice')}>Maior</a>
                            <a href="#" onClick={() => handleOrderSelecionada('menorPrice')}>Menor</a>
                        </div>
                    </div>
                </div>
            </div>
            {selectedFilter && <Escolha selectedFilter={selectedFilter} />} 
        </div>
    );
}

export default Ordenar;
