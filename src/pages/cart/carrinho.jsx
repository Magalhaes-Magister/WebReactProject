import LivroCarrinho from "./livroCarrinho";
import React, {useContext} from 'react'
import {ShopContext} from "../../context/shop-context";
import Books from '../../db.json'

const BOOKS = Books.books;
export default function Carrinho() {
    const {cartItems} = useContext(ShopContext);

    return (
        <div>
            <h1>Your Cart Items</h1>
            <div className="cartItems">
                {BOOKS.map((product) => {
                    if(cartItems.some(item => item.id ===  product.id && item.quantity !== 0) ){
                        return <LivroCarrinho livro={product} key={product.id}/>
                    }else{
                        return null
                    }
                })}
            </div>
        </div>
    )
}
