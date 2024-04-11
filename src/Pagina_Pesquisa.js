import React, { useState } from 'react';
import './Pagina_Pesquisa.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import House from './components/House.jsx';
import Pesquisa from './components/barra_pesquisa.jsx';
import Livros_pesquisados from './components/livros_pesquisa.jsx';


function Pagina_Principal() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const handleCategoriaChange = (novaCategoria) => {
    setCategoriaSelecionada(novaCategoria);
  };
  const [InputCategoria, setInputCategoria] = useState('');
  

  return (
    <>
      <div className="App">
        <Header />
        <div className="Pesquisa">
          <Pesquisa onCategoriaChange={handleCategoriaChange} setInputCategoria={setInputCategoria}/>
        </div>
      
      </div>
      <div className="Livros_pesquisados">
        <Livros_pesquisados InputCategoria={InputCategoria} categoriaSelecionada={categoriaSelecionada} />
      </div>
      <House />
      <Footer />
    </>
  );
}

export default Pagina_Principal;