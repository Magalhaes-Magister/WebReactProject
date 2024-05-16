import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../images/book_logo.png';
import shoppingCar from '../images/car_logo.png';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import Pesquisa from './barra_pesquisa'; 
import './Header.css';

function Header() {
    const { numberCartItems, handleReverterEscolha } = useContext(ShopContext);
    const cartCount = numberCartItems();

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <Link id="logo" to="/">
                    <img src={logo} alt="BookStore" style={{ width: '100px', height: '100px', background: 'none' }} />
                    <div id="titulo">
                        <h1 className={"h1"}>BookStore</h1>
                    </div>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/livro" onClick={() => handleReverterEscolha('all')}>Livros</Nav.Link>
                </Nav>
                <Pesquisa />
                <Nav>
                    <Nav.Link as={Link} to="/carrinho">
                        <img src={shoppingCar} alt="" style={{ width: '50px', background: 'none' }} />
                        {cartCount > 0 ? (
                            <span className="cart-count">{cartCount}</span>
                        ) : (<></>)}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
