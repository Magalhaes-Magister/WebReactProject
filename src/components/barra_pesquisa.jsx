import React, { useState } from 'react';
import './barra_pesquisa.css';

function Pesquisa({ onCategoriaChange, setInputCategoria }) {
    const [categoria, setCategoria] = useState('autor'); // Estado da categoria
    const [inputValue, setInputValue] = useState(''); // Estado do valor do input

    const handleCategoriaChange = (event) => {
        const selectedCategoria = event.target.value;
        setCategoria(selectedCategoria); // Atualizar o estado da categoria
        onCategoriaChange(selectedCategoria); // Chamar a função de callback com a nova categoria selecionada
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Atualizar o estado do valor do input
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setInputCategoria(inputValue); // Chamar a função de callback com o valor do input quando a tecla Enter for pressionada
        }
    };

    return (
        <div id="barra-pesquisa">
            <div className="pesquisa">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
                <input 
                    type="text" 
                    placeholder="Input" 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    onKeyDown={handleKeyPress}
                />
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
