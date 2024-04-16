import './livroCarrinho_style.module.css'
import {useContext} from 'react'
import {ShopContext} from "../../context/shop-context";
import style from './livroCarrinho_style.module.css'
import Button from "react-bootstrap/Button";
import missing from "../../images/missing_img.png";

export default function LivroCarrinho({livro}){
    const { id, title, thumbnailUrl, price } = livro;
    const {cartItems, addToCart, removeFromCart, updateCartItemCount} = useContext(ShopContext);
    let thumbnail = thumbnailUrl || missing;

    return(
        <>
            <div className={style.caixaCa}>

                <div className={style.divImg}>
                    <img className={style.cartImg} src={thumbnail}
                         onError={event => {
                             event.target.src = missing
                             event.onerror = null
                         }}/>
                </div>

                <div className={style.infoCa}>
                    <strong>{title}</strong>
                    <p className={style.price}>{price}€</p>
                </div>

                <div className={style.footer}>

                    <div className={style.remove}>
                        <Button variant={"outline-danger"} onClick={() => updateCartItemCount(0, id)}>Remover</Button>
                    </div>

                    <div className={style.numCa}>
                        <Button style={{"border-color":"black"}} variant="light" onClick={() => removeFromCart(id)}>-</Button>
                        <input  size="3" style={{textAlign: "center"}} type="number" value={cartItems.find((item) => {
                            return item.id === id
                        }).quantity}
                               onChange={(n) => updateCartItemCount(Number(n.target.value), id)}/>
                        <Button style={{"border-color":"black"}} variant="light" onClick={() => addToCart(id)}>+</Button>
                    </div>

                </div>

            </div>
        </>
    )


}