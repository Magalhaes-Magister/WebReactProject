import React from 'react';
import './Pagina_Pesquisa.css';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import House from '../../components/House.jsx';
import CaixaCaixaLivro from "../../components/caixaCaixaLivro.jsx";
import Pesquisa from '../../components/barra_pesquisa.jsx';
import Barra_numero from './barra_numeros.jsx';
import Filtro from './Filtro.jsx';

function Pagina_Principal() {
  return (
    <>
      <div className="App">
        <Header />
        <div className="Pesquisa">
          <Pesquisa style="" />
        </div>
        <div className="Filtro">
        <Filtro />
      </div>
      
      </div>
      <div className="Barra_numero">
        <Barra_numero />
      </div>
      <House />
      <Footer />
    </>
  );
}

export default Pagina_Principal;