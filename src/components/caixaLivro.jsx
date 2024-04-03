import './style_caixaLivro.css'
import star_1 from '../images/1_stars.png'
import star_2 from '../images/2_stars.png'
import star_3 from '../images/3_stars.png'
import star_4 from '../images/4_stars.png'
import star_5 from '../images/5_stars.png'
import basket from '../images/basket.png'
import missing from '../images/missing_img.png'
import {ShopContext} from '../context/shop-context';
import {useContext} from "react";
import {Link} from "react-router-dom";

export default function CaixaLivro({livro}){
    const {addToCart} = useContext(ShopContext);

    let titulo = livro.title;
    let autores = livro.authors || [];
    let thumbnail = livro.thumbnailUrl || 'missing';
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


    return(
        <>

            <div  className={"caixa"}>
                <Link to={`/livro/${livro.id}`}>
                <img id="img" src={thumbnail} alt="" width={155}
                     onError={event => {
                         event.target.src = missing
                         event.onerror = null
                     }}
                />
                <div className="info">
                    <strong>{titulo}</strong>
                    <ul>
                        {autores.map(autor =>{
                            return(
                                <li key={autor}> 
                                    {autor}
                                </li>
                            )
                        })}
                    </ul>
                    <img className={"rating"} src={estrelas} alt="rating" width={150}/>
                </div>
                </Link>
                <button onClick={() => addToCart(livro.id)}>
                    <img src={basket} alt="" width={25}/>
                    Comprar
                </button>
            </div>
        </>
    )
}
