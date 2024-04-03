import LivroCarrinho from "./livroCarrinho";
import React, {useContext} from 'react'
import {ShopContext} from "../../context/shop-context";
import {BOOKS} from "../../books";

export default function Carrinho() {
    const {cartItems, deleteCart, getTotalCartAmount} = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    return (
        <div>
            <h1>Your Cart Items</h1>
            <button onClick={() => deleteCart()}>Delete Cart</button>
            <div className="cartItems">
                {BOOKS.map((product) => {
                    if(cartItems.some(item => item.id ===  product.id) ){
                        return <LivroCarrinho livro={product} key={product.id}/>
                    }else{
                        return null
                    }
                })}
            </div>
            <p>Total: {totalAmount}€</p>
            <button>Continuar a comprar</button>
            <button>Checkout</button>
        </div>
    )
}
