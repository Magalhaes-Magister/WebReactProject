import Books from '../db.json'
import './livroCarrinho_style.css'
import {useState} from 'react'

export default function LivroCarrinho(){
    let livro = Books.books[0];
    let titulo = livro.title;
    let thumbnail = livro.thumbnailUrl;
    let num = 1;


    const[container, setContainer] = useState(1)

    const increase =() => {
        setContainer(count => count + 1)
    };
    const decrease= () => {
        setContainer(count => count - 1)
    };

    if(container<1){
        return (<></>);
    } else { return(
        <>
            <div className={"caixaCa"}>
                <img src={thumbnail}/>
                <div className={"infoCa"}>
                    <strong>{titulo}</strong>
                    <div className={"numCa"}>
                        <button onClick={decrease}>-</button>
                        <span className={"num_container"}>{container}</span>
                        <button onClick={increase}>+</button>
                    </div>
                </div>
            </div>
        </>
    )}


}