import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import House from './components/House.jsx';
import CaixaLivro from "./components/caixaLivro";
import CaixaCaixaLivro from "./components/caixaCaixaLivro";
import Books from "./db.json";
import Pesquisa from './components/barra_pesquisa.jsx';
import Barra_numero from './components/barra_numeros.jsx';
import Filtro from './components/Filtro.jsx';

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <div className="Pesquisa">
          <Pesquisa style="" />
        </div>
        <div className="Filtro">
        <Filtro />
      </div>
        <div className="CaixaCaixaLivro"></div>
        <CaixaCaixaLivro />
      </div>
      <div className="Barra_numero">
        <Barra_numero />
      </div>
      <House />
      <Footer />
    </>
  );
}

export default App;