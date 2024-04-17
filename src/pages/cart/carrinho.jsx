import LivroCarrinho from "./livroCarrinho";
import React, {useContext} from 'react'
import {ShopContext} from "../../context/shop-context";
import {BOOKS} from "../../books";
import {useNavigate} from "react-router-dom";
import style from './carrinho_style.module.css'
import Button from "react-bootstrap/Button";

export default function Carrinho() {
    const {cartItems, deleteCart, getTotalCartAmount} = useContext(ShopContext);
    let totalAmount = getTotalCartAmount().toFixed(2);
    const navigate = useNavigate();

    return (
        <div className={style.cart}>
            <h1 className={style.cartTitle}>O teu Carrinho</h1>
            <div className={style.cartWrapper}>
                {totalAmount > 0 ? (
                <div className={style.cartItems}>
                    {BOOKS.map((product) => {
                        if(cartItems.some(item => item.id ===  product.id) ){
                            return <LivroCarrinho livro={product} key={product.id}/>
                        }else{
                            return null
                        }
                    })}
                </div>): ( <h2 className={style.vazio}>O Carrinho está vazio</h2>)}

                <div className={style.cartSide}>
                    <div className={style.cartButtons}>

                        <div className={style.total}>
                            <strong style={{fontSize: "2em"}}>Total:</strong>
                            <span style={{fontSize: "2em", color: "red", fontWeight: "bold"}}> {totalAmount}€</span>
                        </div>

                        <Button variant={"warning"} className={style.buttonBuy}>Checkout</Button>
                        <div className={style.buttonsAd}>
                            <Button onClick={() => navigate("/livro")}>Continuar a comprar</Button>
                            <Button variant={"outline-danger"} onClick={() => deleteCart()}>Delete Cart</Button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
