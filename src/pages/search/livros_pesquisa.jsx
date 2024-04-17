import React, { useState, useEffect } from 'react';
import db from '../../db.json';
import CaixaCaixaLivro from './caixaCaixaLivro';
import Filtro from './Filtro';
import BarraNumero from './barra_numero';

function LivrosPesquisados(InputCategoria) { 
  const totalBooks = db.books.length;
  const booksPorPagina = 5;
  const Input = InputCategoria.InputCategoria;
  const Categoria = InputCategoria.categoriaSelecionada;
  const totalPaginas = Math.ceil(totalBooks / booksPorPagina);
  const [Pagina_Atual, setPagina_Atual] = useState(1);
  const [clickedNumber, setClickedNumber] = useState('');
  const [scoreFiltro, setscoreFiltro] = useState({ min: 0, max: 5 });
  const [priceFiltro, setpriceFiltro] = useState({ min: 0, max: 30 });
  
  useEffect(() => {
    setPagina_Atual(1);
    setClickedNumber(1);
  }, [totalPaginas]);

  const handleClick = (number) => {
    setPagina_Atual(number);
    setClickedNumber(number);
  };

  const handlePrimeiraPagina = () => {
    setPagina_Atual(1);
    setClickedNumber(1);
  };

  const handleProximaPagina = () => {
    const ProximaPagina = Pagina_Atual + 1;
    if (ProximaPagina <= totalPaginas) {
      setPagina_Atual(ProximaPagina);
      setClickedNumber(ProximaPagina);
    }
  };

  const CalculoStartEndIndex = () => {
    let start;
    let end;
    if (clickedNumber >= 2 && clickedNumber <= totalPaginas - 4) {
      start = clickedNumber - 1;
      end = clickedNumber + 3;
    } else if (clickedNumber > totalPaginas - 4) {
      start = totalPaginas - 4;
      end = totalPaginas;
    } else {
      start = 1;
      end = 5;
    }
    return { start, end };
  };

  const CalculoStartEndLivro = () => {
    const start_book = (Pagina_Atual - 1) * booksPorPagina + 1;
    const end_book = Pagina_Atual * booksPorPagina;
    return { start_book, end_book };
  };

  const { start, end } = CalculoStartEndIndex();
  const { start_book, end_book } = CalculoStartEndLivro();

  return (
    <div className="barra_numero">
      <Filtro setscoreFiltro={setscoreFiltro} setpriceFiltro={setpriceFiltro} />
      <CaixaCaixaLivro
        start={start}
        end={end}
        scoreFiltro={scoreFiltro}
        priceFiltro={priceFiltro}
        input={Input}
        categoriaSelecionada={Categoria}
      />
      <BarraNumero
        totalPaginas={totalPaginas}
        clickedNumber={clickedNumber}
        handleClick={handleClick}
        handlePrimeiraPagina={handlePrimeiraPagina}
        handleProximaPagina={handleProximaPagina}
        start={start}
        end={end}
      />
    </div>
  );
}

export default LivrosPesquisados;
