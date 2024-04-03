import React from 'react';
import './Pagina_Principal.css';
import Footer from '../../components/Footer.jsx';
import House from '../../components/House.jsx';
import CaixaCaixaLivro from "../../components/caixaCaixaLivro.jsx";
import Pesquisa from '../../components/barra_pesquisa.jsx';


function Pagina_Principal() {
  return (
    <>
      <div className="App">
        <div className="Pesquisa">
          <Pesquisa style="" />
        </div>
        <div className="CaixaCaixaLivro"></div>
        <CaixaCaixaLivro />
      </div>
      <House />
      <Footer />
    </>
  );
}

export default Pagina_Principal;    