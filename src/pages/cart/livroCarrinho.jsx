import Books from '../../db.json'
import './livroCarrinho_style.css'
import {useContext, useState} from 'react'
import {ShopContext} from "../../context/shop-context";

export default function LivroCarrinho({livro}){
    const { id, title, thumbnailUrl } = livro;
    const {cartItems, addToCart, removeFromCart, updateCartItemCount} = useContext(ShopContext);

    return(
        <>
            <div className={"caixaCa"}>
                <img src={thumbnailUrl}/>
                <div className={"infoCa"}>
                    <strong>{title}</strong>
                    <div className={"numCa"}>
                        <button onClick={() => removeFromCart(id)}>-</button>
                        <input value={cartItems.find((item) => { return item.id === id}).quantity}
                                onChange={(n) => updateCartItemCount(Number(n.target.value), id)}/>
                        <button onClick={() => addToCart(id)}>+</button>
                        <p>{livro.price}</p>
                    </div>
                </div>
            </div>
        </>
    )


}