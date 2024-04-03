import React, {useEffect, useState} from 'react';
import Pagina_Pesquisa from './pages/search/Pagina_Pesquisa.js';
import Pagina_Principal from './pages/home/Pagina_Principal.js';
import Carrinho from "./pages/cart/carrinho";
import {IndividualBook} from "./pages/individualBooks/individualBook";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header.jsx'
import {ShopContextProvider} from "./context/shop-context";

function App() {
  return (
    <>
        <ShopContextProvider>
            <Router>
                <Header />
                    <Routes>
                        <Route path="/" element={<Pagina_Principal />}/>
                        <Route path="/carrinho" element={<Carrinho />}/>
                        <Route path="/livro/:livroId" element={<IndividualBook />}/>
                    </Routes>
            </Router>
        </ShopContextProvider>
    </>
  );
}
export default App;