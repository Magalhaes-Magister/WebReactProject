
import React, {useContext} from 'react'
import { useParams } from 'react-router-dom';
import {useFetch} from "../../books";
import style from "./individualBook.module.css";
import Button from "react-bootstrap/Button";
import star_1 from "../../images/1_stars.png";
import star_2 from "../../images/2_stars.png";
import star_3 from "../../images/3_stars.png";
import star_4 from "../../images/4_stars.png";
import star_5 from "../../images/5_stars.png";
import missing from "../../images/missing_img.png";
import basket from "../../images/basket.png";
import {ShopContext} from "../../context/shop-context";

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

export const IndividualBook = () => {
    const {data} = useFetch();
    const BOOKS = data.books;

    const { livroId } = useParams();
    const {thumbnailUrl, longDescription, title, authors, publishedDate, pageCount, score, price, isbn}
        = BOOKS.find((item) => { return item.id === livroId});
    const {addToCart} = useContext(ShopContext);
    let preco = price || "Indisponível";
    let thumbnail = thumbnailUrl || missing;

    let estrelas;
    switch (score){
        case 1:
            estrelas = star_1;
            break;
        case 2:
            estrelas = star_2;
            break;
        case 3:
            estrelas = star_3;
            break;
        case 4:
            estrelas = star_4;
            break;
        case 5:
            estrelas = star_5;
            break;
    }

    return (
        <div className={style.livroCaixa}>

            <div className={style.livroImg}>
                <img src={thumbnail} className={style.thumb}
                     onError={event => {
                         event.target.src = missing
                         event.onerror = null
                     }}/>
            </div>

            <div className={style.livroLeft}>
                <div className={style.livroInfo}>
                    <h1 style={{fontWeight: "bold"}}>{title}</h1>
                    <ul style={{listStyleType: "none"}}>
                        by
                        {authors.map(autor => {
                            return (<li>{autor}</li>)
                        })}
                    </ul>
                    <img src={estrelas} style={{maxWidth: "30%", minWidth: "170px"}}/>
                    <p className={style.preco}>{preco} {preco!=="Indisponível"? "€":""}</p>
                    {preco !== "Indisponível" ? (
                        <Button variant="warning" style={{width: "45%", height: "50px"}} onClick={() => addToCart(livroId)}>
                            <img src={basket} alt="" width={25}/>
                            &ensp;
                            Comprar
                        </Button>): (
                        <Button variant="warning" style={{width: "45%", height: "50px"}}  disabled>
                            <img src={basket} alt="" width={25}/>
                            &ensp;
                            Comprar
                        </Button>
                    )}
                </div>
                <div>
                    {longDescription != null ? (
                        <>
                            <h2>Sinopse</h2>
                            <p className={style.paddLeft}>{longDescription}</p>
                        </>
                    ) : (<></>)}
                    <h3>Características</h3>
                    <p className={style.paddLeft}>Publicado em {formatDate(new Date(publishedDate.$date))}</p>
                    <p className={style.paddLeft}>Número de páginas: {pageCount}</p>
                    <p className={style.paddLeft}>isbn: {isbn}</p>

                </div>
            </div>

        </div>
    )
}