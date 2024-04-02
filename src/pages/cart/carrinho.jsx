import LivroCarrinho from "./livroCarrinho";
import React, {useContext} from 'react'
import {ShopContext} from "../../context/shop-context";
import {BOOKS} from "../../books";

export default function Carrinho() {
    const {cartItems, deleteCart} = useContext(ShopContext);

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
        </div>
    )
}
