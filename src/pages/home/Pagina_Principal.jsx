import React from 'react';
import Carrousel from "./carrousel";
import bookstore from "../../images/bookstore.jpg"
import './Pagina_Principal.css'


function Pagina_Principal() {
  return (
    <div>
        <div className={"box"} style={{backgroundImage: `url(${bookstore})`}}>
            <h1 className={"mainTitle"} >Livros Principais</h1>
        </div>
        <Carrousel/>
    </div>
  )
}

export default Pagina_Principal;    