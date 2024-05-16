import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; 
import './barra_pesquisa.css';
import { ShopContext } from '../context/shop-context';
function Pesquisa() {
    const { handleCategoriaChange, handleInputChange, categoria, inputValue, value, handleKeyPress, enterPressed, setEnterPressed } = useContext(ShopContext);
    
    return (
        <div id="barra-pesquisa">
            <div className="pesquisa">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
                <input 
                    type="text" 
                    placeholder="Input" 
                    value={value} 
                    onChange={handleInputChange} 
                    onKeyDown={handleKeyPress}
                />
                {enterPressed && (
                    <>
                        <Navigate to="/livro" />
                        {setEnterPressed(false)}
                    </>
                )}
            </div>
            <div className="categorias">
                <select value={categoria} onChange={handleCategoriaChange}>
                    <option value="autor">Autor</option>
                    <option value="titulo">Título</option>
                    <option value="categoria">Categoria</option>
                </select>
            </div>
        </div>
    );
}

export default Pesquisa;
