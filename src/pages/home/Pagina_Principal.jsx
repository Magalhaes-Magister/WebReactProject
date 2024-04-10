import React from 'react';
import Footer from '../../components/Footer.jsx';
import House from '../../components/House.jsx';
import CaixaCaixaLivro from "../../components/caixaCaixaLivro.jsx";
import Pesquisa from '../../components/barra_pesquisa.jsx';
import Carrousel from "./carrousel";


function Pagina_Principal() {
  return (
    <>
        <Pesquisa />
        <Carrousel/>
        <House />
        <Footer />
    </>
  )
}

export default Pagina_Principal;    