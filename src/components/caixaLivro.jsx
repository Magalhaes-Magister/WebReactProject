import './style_caixaLivro.css'
import star_1 from '../images/1_stars.png'
import star_2 from '../images/2_stars.png'
import star_3 from '../images/3_stars.png'
import star_4 from '../images/4_stars.png'
import star_5 from '../images/5_stars.png'
import basket from '../images/basket.png'
export default function CaixaLivro({livro}){

    let titulo = livro.title;
<<<<<<< HEAD:src/components/caixaLivro.js
    let autores = livro.authors;
=======
    let autores = livro.authors || [];
>>>>>>> 611da071c5315a2ea57399751f872c80062bb2a3:src/components/caixaLivro.jsx
    let thumbnail = livro.thumbnailUrl;
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
            <div className={"caixa"}>
                <img src={thumbnail} width={155}/>
                <div className="info">
                    <strong>{titulo}</strong>
                    <ul>
                        {autores.map(autor =>{
                            return(
                                <li>
                                    {autor}
                                </li>
                            )
                        })}
                    </ul>
                    <img className={"rating"} src={estrelas} width={150}/>
                </div>
                <button>
                    <img src={basket} width={25}/>
                    Comprar
                </button>
            </div>
        </>
    )
}