import React, {useContext} from 'react';
import Pagina_Principal from "./pages/home/Pagina_Principal";
import Pagina_Pesquisa from './pages/search/Pagina_Pesquisa';
import Carrinho from "./pages/cart/carrinho";
import {IndividualBook} from "./pages/individualBooks/individualBook";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header.jsx'
import {ShopContextProvider} from "./context/shop-context";
import './index.css';
import Footer from "./components/Footer";
import './App.css'

function App() {
  return (
    <>
        <ShopContextProvider>
            <Router>
                <Header />
                    <Routes>
                        <Route path="/" element={<Pagina_Principal />}/>
                        <Route path="/livro" element={<Pagina_Pesquisa />}/>
                        <Route path="/carrinho" element={<Carrinho />}/>
                        <Route path="/livro/:livroId" element={<IndividualBook />}/>
                    </Routes>
                <Footer />
            </Router>
        </ShopContextProvider>
    </>
  );
}
export default App;


// avisar no relatorio que damos import ao db.json para termos acesso aos livros