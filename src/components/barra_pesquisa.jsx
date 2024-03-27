import React from 'react';
import './barra_pesquisa.css'; 

function Pesquisa() {
    return (
        <div id="barra-pesquisa">
            <div className="pesquisa">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Input" />
            </div>
            <div className="categorias">
                <select>
                    <option value="categoria1">Autor</option>
                    <option value="categoria2">Titulo</option>
                    <option value="categoria3">Categoria</option>
                </select>
            </div>
        </div>
    );
}

export default Pesquisa;
