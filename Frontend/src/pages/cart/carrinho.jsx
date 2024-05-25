import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../../context/shop-context";
import { BooksContext, fetchBooks } from '../../books';
import { useNavigate } from "react-router-dom";
import style from './carrinho_style.module.css';
import Button from "react-bootstrap/Button";
import LivroCarrinho from "./livroCarrinho";

export default function Carrinho() {
    const [books, setBooks] = useState([]);
    const { cartItems, deleteCart, getTotalCartAmount } = useContext(ShopContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data);
            } catch (error) {
                console.error('Erro ao buscar livros:', error);
            }
        };

        fetchData();
    }, []);

    let totalAmount = getTotalCartAmount().toFixed(2);

    return (
        <div className={style.cart}>
            <h1 className={style.cartTitle} style={{ marginTop: "10px" }}>O teu Carrinho</h1>
            <div className={style.cartWrapper}>
                {totalAmount > 0 ? (
                    <div className={style.cartItems}>
                        {books.map((product) => {
                            if (cartItems.some(item => item.id === product.id)) {
                                return <LivroCarrinho livro={product} key={product.id} />
                            } else {
                                return null
                            }
                        })}
                    </div>) : (<h2 className={style.vazio}>O Carrinho está vazio</h2>)}

                <div className={style.cartSide}>
                    <div className={style.cartButtons}>

                        <div className={style.total}>
                            <strong style={{ fontSize: "2em" }}>Total:</strong>
                            <span style={{ fontSize: "2em", color: "red", fontWeight: "bold" }}> {totalAmount}€</span>
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
