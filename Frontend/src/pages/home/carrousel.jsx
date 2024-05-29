import React, { useContext, useEffect, useState } from 'react';
import "./carrousel_style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useFetch} from "../../fetch/useFetch";

function Carrousel() {
    const {data, error} = useFetch();
    const books = data.books
    /*
    const [books, setBooks] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchBooks();
            setBooks(data.filter(item => item.score === 5));
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

     */

    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        centerMode: true,
        centerPadding: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {books.map((item) => (
                    <Link to={`/livro/${item.id}`} key={item.id}>
                        <Card>
                            <Card.Img className="img" variant="top" src={item.thumbnailUrl} />
                            <Card.Body>
                                <Card.Title style={{ fontWeight: "bold" }}>{item.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
            </Slider>
        </div>
    );
}

export default Carrousel;
