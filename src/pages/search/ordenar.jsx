import React, { useContext, useState } from 'react';
import './Filtro.css';
import { ShopContext } from '../../context/shop-context';

function Ordenar() {
    const { handleOrderSelecionadaPreco, handleOrderSelecionadaRanking} = useContext(ShopContext);
    const [showDropDown , setShowDropDown] = useState(false);
    const [showRankingDropdown, setShowRankingDropdown] = useState(false);
    const [showPrecoDropdown, setShowPrecoDropdown] = useState(false);

    return (
        <div className="filtro">
            <div className="Botao_filtro">
                <button className="Botao_Principal" onClick={() => setShowDropDown(!showDropDown)}>Ordenar Por</button>
                <div className="Botao_drop">
                    <div className="Botao_segundario">
                        <a href="#" onClick={() => setShowRankingDropdown(!showRankingDropdown)}>Ranking</a>
                        {showRankingDropdown && (
                            <div className="Botao_segundario_conteudo">
                                <a href="#" onClick={() => handleOrderSelecionadaRanking('maiorScore')}>Maior</a>
                                <a href="#" onClick={() => handleOrderSelecionadaRanking('menorScore')}>Menor</a>
                            </div>
                        )}
                    </div>
                    <div className="Botao_segundario">
                        <a href="#" onClick={() => setShowPrecoDropdown(!showPrecoDropdown)}>Preço</a>
                        {showPrecoDropdown && (
                            <div className="Botao_segundario_conteudo">
                                <a href="#" onClick={() => handleOrderSelecionadaPreco('maiorPrice')}>Maior</a>
                                <a href="#" onClick={() => handleOrderSelecionadaPreco('menorPrice')}>Menor</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ordenar;
