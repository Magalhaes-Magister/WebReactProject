import React, { useContext, useState, useEffect } from 'react';
import CaixaCaixaLivro from './caixaCaixaLivro';
import Filtro from '../pages/search/Filtro';
import Ordenar from '../pages/search/ordenar';
import BarraNumero from '../pages/search/barra_numero'; 
import { ShopContext } from "../context/shop-context";

function LivrosPesquisados({ InputCategoria, categoriaSelecionada }) {
    const {CalculoStartEndLivro, CalculoStartEndIndex } = useContext(ShopContext);
    const Input = InputCategoria;
    const Categoria = categoriaSelecionada;
    const [scoreFiltro, setscoreFiltro] = useState({ min: 0, max: 5 });
    const [priceFiltro, setpriceFiltro] = useState({ min: 0, max: 30 });
    const [OrderSelecionada, setOrderSelecionada] = useState(null);
    console.log(Input);
    console.log(Categoria);

    CalculoStartEndIndex();
    CalculoStartEndLivro();

    return (
        <div className="barra_numero">
            <Filtro setscoreFiltro={setscoreFiltro} setpriceFiltro={setpriceFiltro} />
            <Ordenar setOrderSelecionada={setOrderSelecionada}/>
            <CaixaCaixaLivro
                scoreFiltro={scoreFiltro}
                priceFiltro={priceFiltro}
                OrderSelecionada={OrderSelecionada}
                input={Input}
                categoriaSelecionada={Categoria}
            />
            <BarraNumero/>
        </div>
    );
}

export default LivrosPesquisados;
