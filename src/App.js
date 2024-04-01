import Pagina_Principal from './Pagina_Principal.js';
import Carrinho from "./pages/cart/carrinho";

import Header from './components/Header.jsx'
import {ShopContextProvider} from "./context/shop-context";

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