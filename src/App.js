import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import House from './components/House.jsx';
import Pesquisa from './components/barra_pesquisa.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <House />
      <Footer /> 
      <Pesquisa />
    </div>
  );
}

export default App;
