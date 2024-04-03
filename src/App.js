import Pagina_Principal from './Pagina_Principal.js';
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
                        <Route path="/" element={<Pagina_Pesquisa />}/>
                        <Route path="/carrinho" element={<Carrinho />}/>
                        <Route path="/livro/:livroId" element={<IndividualBook />}/>
                    </Routes>
            </Router>
        </ShopContextProvider>
    </>
  );
}
export default App;