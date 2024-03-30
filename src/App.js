import React, {useEffect, useState} from 'react';
import Pagina_Pesquisa from './pages/Pagina_Pesquisa.js';
import Pagina_Principal from './pages/Pagina_Principal.js';
import Carrinho from "./pages/carrinho";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header.jsx'

function App() {
  return (
    <>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Pagina_Principal />}/>
                <Route path="/carrinho" element={<Carrinho />}/>
            </Routes>
        </Router>
    </>
  );
}
export default App;