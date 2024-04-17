import React, { useContext } from 'react';
import CaixaCaixaLivro from './caixaCaixaLivro';
import Filtro from '../search/Filtro';
import Ordenar from '../search/ordenar';
import BarraNumero from '../search/barra_numero';
import { ShopContext } from "../../context/shop-context";
import Escolha from '../search/Escolha';

function LivrosPesquisados({ InputCategoria, categoriaSelecionada, priceFiltro, scoreFiltro, orderSelecionada, autorValue, categoriaValue}) {
    const {CalculoStartEndLivro, CalculoStartEndIndex, selectedOptions, handleReverterEscolha } = useContext(ShopContext);
    const Input = InputCategoria;
    const Categoria = categoriaSelecionada;

    CalculoStartEndIndex();
    CalculoStartEndLivro();

    return (
        <div className="barra_numero">
            <Filtro />
            <Ordenar/>
            <Escolha selectedOptions={selectedOptions} handleReverterEscolha={handleReverterEscolha} /> 
            <CaixaCaixaLivro
                scoreFiltro={scoreFiltro}
                priceFiltro={priceFiltro}
                OrderSelecionada={orderSelecionada}
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
