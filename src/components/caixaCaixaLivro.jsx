import './caixaCaixaLivroStyle.css';
import CaixaLivro from "./caixaLivro";
import Books from "../db.json";

export default function CaixaCaixaLivro(){
    let books = Books.books.slice(0,10);
    console.log(books);

    return(
        <>
            <div className={"caixa_grande"}>
                {books.map(b =>{
                    return(
                        <CaixaLivro livro={b}/>
                    )
                })}
            </div>
        </>
    )
}