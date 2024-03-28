import React from 'react';
import './Filtro.css';

function filtro() {
    return (
        <div className="filtro">
            <li className="botao_filtro">
                <span className="Opcoes">Ordenar Por</span>
                <ul className='Zero'>
                    <li className='Primeiro'>
                        <a href="">Ranking</a>
                        <ul id='Primeiro_1'>
                            <li><a href="">0-1</a></li>
                            <li><a href="">1-2</a></li>
                            <li><a href="">2-3</a></li>
                            <li><a href="">3-4</a></li>
                            <li><a href="">4-5</a></li>
                        </ul>
                    </li>
                    <li className='Segundo'>
                        <a href="">Preço</a>
                        <ul id='Segundo_2'>
                            <li><a href=""> 0-10 </a></li>
                            <li><a href=""> 10-20 </a></li>
                            <li><a href=""> 20-30 </a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        </div>
    );
}

export default filtro;