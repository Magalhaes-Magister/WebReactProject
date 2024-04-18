import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../images/book_logo.png';
import './Footer.css';

function Footer() {
    return (
        <div className='footer'>
            <div className="footer-container">
                <div className="footer-meio">
                    <div id="titulo">
                      <img src={logo} alt="BookStore" />
                        <h1>BookStore</h1>
                    </div>
                </div>
                <div className="footer-meio">
                    <h2>Contato</h2>
                    <ul>
                        <li><FaPhone /> 999999999</li>
                        <li><FaEnvelope /> DuvidasGerais@bookstore.pt</li>
                        <li><FaMapMarkerAlt /> Rua Camoes, Lisboa, Portugal</li>
                    </ul>
                </div>
                <div className="footer-meio">
                    <h2>Suporte</h2>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Política de Privacidade</a></li>
                        <li><a href="#">Termos</a></li>
                    </ul>
                </div>
                <div className="footer-meio">
                    <h2>Redes Sociais</h2>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-baixo">
                <p>© 2024, BookStore Inc. Todos os direitos reservados.</p>
            </div>
        </div>
    );
}

export default Footer;
