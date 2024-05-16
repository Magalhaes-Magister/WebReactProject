import React from 'react';
import './escolha.css';

function Escolha({ selectedOptions, handleReverterEscolha }) {
    console.log(selectedOptions);
    return (
        <div>
            {selectedOptions && Object.keys(selectedOptions).map((key) => (
                <div key={key} className="escolha-container">
                    <p>{selectedOptions[key]}</p>
                    <button onClick={() => handleReverterEscolha(key)}>x</button>
                </div>
            ))}
        </div>
    );
}

export default Escolha;
