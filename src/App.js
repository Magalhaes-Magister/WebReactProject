import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import House from './components/House.jsx';
import CaixaLivro from "./components/caixaLivro";
import Books from "./db.json";
import Pesquisa from './components/barra_pesquisa.jsx';
import Barra_numero from './components/barra_numeros.jsx';
import Filtro from './components/Filtro.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Pesquisa />
        <CaixaLivro
            livro={Books.books[0]}
        />
      <Barra_numero />
      <Filtro />
      <House />
      <Footer /> 
    </div>
  );
}

export default App;