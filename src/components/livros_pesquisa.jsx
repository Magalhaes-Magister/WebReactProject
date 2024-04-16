import React, { useContext } from 'react';
import CaixaCaixaLivro from './caixaCaixaLivro';
import Filtro from '../pages/search/Filtro';
import Ordenar from '../pages/search/ordenar';
import BarraNumero from '../pages/search/barra_numero'; 
import { ShopContext } from "../context/shop-context";

function LivrosPesquisados({ InputCategoria, categoriaSelecionada, priceFiltro, scoreFiltro, setOrderSelecionada, autorValue, categoriaValue}) {
    const {CalculoStartEndLivro, CalculoStartEndIndex } = useContext(ShopContext);
    const Input = InputCategoria;
    const Categoria = categoriaSelecionada;

    CalculoStartEndIndex();
    CalculoStartEndLivro();

    return (
        <div className="barra_numero">
            <Filtro />
            <Ordenar setOrderSelecionada={setOrderSelecionada}/>
            <CaixaCaixaLivro
                scoreFiltro={scoreFiltro}
                priceFiltro={priceFiltro}
                input={Input}
                categoriaSelecionada={Categoria} 
                autorValue={autorValue}
                categoriaValue={categoriaValue}
            />
            <BarraNumero/>
        </div>
    );
}

export default LivrosPesquisados;
