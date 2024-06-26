import React from 'react'
import {useFetch} from "../../useFetch";
import "./carrousel_style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

function Carrousel() {
    const {data, error} = useFetch();
    const BOOKS = data.books
    const books = BOOKS.filter(item => {return(item.score === 5)})

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
                {books.map((item) => {return(
                    <Link to={`/livro/${item.id}`}>
                        <Card>
                            <Card.Img className="img" variant="top" src={item.thumbnailUrl}/>
                            <Card.Body>
                                <Card.Title style={{fontWeight: "bold"}}>{item.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                )})}
            </Slider>
        </div>
    );
}

export default Carrousel;