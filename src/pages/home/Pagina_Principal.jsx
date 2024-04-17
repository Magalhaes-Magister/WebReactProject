import React from 'react';
import Carrousel from "./carrousel";
import TopLivros from "./TopLivros";
import LivrosPorAutor from "./LivrosPorAutor";
import bookstore from "../../images/bookstore.jpg";
import './Pagina_Principal.css';
import './TopLivros.css';

function Pagina_Principal() {
  return (
    <div>
        <div className={"box"} style={{backgroundImage: `url(${bookstore})`}}>
            <h1 className={"mainTitle"} >Livros Principais</h1>
        </div>
        <Carrousel/>
        <div className="outras-abas">
            <TopLivros />
            <LivrosPorAutor autor="W. Frank Ableson" />
        </div>
    </div>
  )
}

export default Pagina_Principal;
