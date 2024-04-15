import React from 'react';
import './escolha.css';

function Escolha({ selectedFilter, onReverterEscolha }) {
    return (
        <div>
            {selectedFilter && (
                <div className="escolha-container">
                    <p>{selectedFilter}</p>
                    <button onClick={onReverterEscolha}>x</button>
                </div>
            )}
        </div>
    );
}

export default Escolha;
