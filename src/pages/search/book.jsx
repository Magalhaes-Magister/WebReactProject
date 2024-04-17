import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import React, {useContext} from 'react'
import {NavLink} from "react-router-dom";
import star_1 from "../../images/1_stars.png";
import star_2 from "../../images/2_stars.png";
import star_3 from "../../images/3_stars.png";
import star_4 from "../../images/4_stars.png";
import star_5 from "../../images/5_stars.png";
import missing from '../../images/missing_img.png'
import basket from '../../images/basket.png'
import 'bootstrap/dist/css/bootstrap.css';
import Styles from './book_style.module.css';
import {ShopContext} from "../../context/shop-context";


export default function Book({livro}) {
    const {addToCart} = useContext(ShopContext);
    const {thumbnailUrl, title, authors, price} = livro;
    let autores = authors || [];
    let preco = price || "Indisponível";
    let thumbnail = thumbnailUrl || missing;

    let estrelas;
    switch (livro.score){
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
        <Card className={Styles.card} >
            <NavLink to={`/livro/${livro.id}`}>
            <div className={Styles.click}>
                    <div className={Styles.img}>
                        <Card.Img className={Styles.cardImg} src={thumbnail}
                                  onError={event => {
                                      event.target.src = missing
                                      event.onerror = null
                                  }}/>
                    </div>
                <Card.Body className={Styles.cardBody}>
                <NavLink to={`/livro/${livro.id}`}>
                    <Card.Title  className={Styles.cardTitle}>{title}</Card.Title>
                </NavLink>
                    <Card.Text>
                        <ul className={Styles.cardUl}>
                            {autores.map(autor => {
                                return (<li>{autor}</li>)
                            })}
                        </ul>
                    </Card.Text>
                </Card.Body>

                <div className={Styles.cardInfo}>
                    <img src={estrelas} className={Styles.cardStars} width={"150px"}/>
                    <p className={Styles.cardPrice} style={{margin:"0"}}>{preco} {preco!=="Indisponível"? "€":""}</p>
                </div>
            </div>
            </NavLink>
            {preco !== "Indisponível" ? (
                <Button variant="warning" className={Styles.cardButton} onClick={() => addToCart(livro.id)}>
                <img src={basket} alt="" width={25}/>
                    &ensp;
                    Comprar
                </Button>): (
                <Button variant="warning" className={Styles.cardButton} disabled>
                    <img src={basket} alt="" width={25}/>
                    &ensp;
                    Comprar
                </Button>
            )}


        </Card>
    )
}
