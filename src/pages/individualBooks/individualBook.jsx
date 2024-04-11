import React from 'react'
import { useParams } from 'react-router-dom';
import {BOOKS} from "../../books";

export const IndividualBook = () => {
    const { livroId } = useParams();
    const {thumbnailUrl, longDescription, title, authors, publishedDate, categories, pageCount, score, price} = BOOKS.find((item) => { return item.id === livroId});

    return (
        <div className={"livro_caixa"}>
            <img src={thumbnailUrl}/>
            <div className={"caixa_info"}>
                <p>{title}</p>
                <ul>
                    {authors.map(autor => {return (<li>{autor}</li>)})}
                </ul>
                <p>{longDescription}</p>
                <p>Publicado em {publishedDate.$date}</p>
                <p>Num de páginas: {pageCount}</p>
                <p>Score: {score}/5</p>
                <p>Preço: {price}</p>
            </div>
        </div>
    )
}