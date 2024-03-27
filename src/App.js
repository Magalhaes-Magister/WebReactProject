import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import House from './components/House.jsx';
import CaixaLivro from "./components/caixaLivro";
import Books from "./db.json";

function App() {
  return (
    <div className="App">
      <Header />
        <CaixaLivro
            livro={Books.books[0]}
        />
      <House />
      <Footer /> 
    </div>
  );
}

export default App;