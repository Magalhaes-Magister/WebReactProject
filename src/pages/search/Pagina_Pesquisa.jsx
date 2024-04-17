import React, { useContext } from 'react';
import './Pagina_Pesquisa.css';
import Livros_pesquisados from '../search/livros_pesquisa.jsx';
import { ShopContext } from '../../context/shop-context.jsx';

function Pagina_Principal() {
  const { inputValue, categoria, priceFiltro, scoreFiltro, orderSelecionada, autorValue, categoriaValue } = useContext(ShopContext);
  console.log(inputValue);
  console.log(categoria);
  return (
    <>
      <div className="App">
      </div>
      <div className="Livros_pesquisados">
        <Livros_pesquisados InputCategoria={inputValue} categoriaSelecionada={categoria} priceFiltro={priceFiltro} scoreFiltro={scoreFiltro} orderSelecionada={orderSelecionada} autorValue={autorValue} categoriaValue={categoriaValue}/>
      </div>
    </>
  );
}

export default Pagina_Principal;