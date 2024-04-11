import LivroCarrinho from "./livroCarrinho";
import React, {useContext} from 'react'
import {ShopContext} from "../../context/shop-context";
import {BOOKS} from "../../books";
import {useNavigate} from "react-router-dom";

export default function Carrinho() {
    const {cartItems, deleteCart, getTotalCartAmount} = useContext(ShopContext);
    let totalAmount = getTotalCartAmount();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Your Cart Items</h1>
            <div className="cartItems">
                {console.log(totalAmount)}
                {BOOKS.map((product) => {
                    if(cartItems.some(item => item.id ===  product.id) ){
                        return <LivroCarrinho livro={product} key={product.id}/>
                    }else{
                        return null
                    }
                })}
            </div>
            {totalAmount > 0 ? (
                <>
                    <p>Total: {totalAmount}€</p>
                    <button onClick={() => navigate("/")}>Continuar a comprar</button>
                    <button>Checkout</button>
                    <button onClick={() => deleteCart()}>Delete Cart</button>
                </>
            ) : (
                <h2>O Carrinho está vazio</h2>
            )}
        </div>
    )
}
