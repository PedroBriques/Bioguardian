import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../Style/Footer.css";

const Footer1 = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Email enviado: ${ email }/nMensagem: ${ message }');
        setEmail("");
        setMessage("");
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Sobre Nós</h3>
                    <p>Somos uma empresa dedicada a oferecer os melhores produtos e serviços.</p>
                </div>
                <div className="footer-column">
                    <h3>Nosso Serviço</h3>
                    <p>Oferecemos uma variedade de serviços para atender às suas necessidades.</p>
                </div>
                <div className="footer-column">
                    <h3>Links Úteis</h3>
                    <ul className="footer-links">°
                        <Link to="/">Início</Link>
                        <Link to="/">Sobre</Link>
                        <Link to="/">Contato</Link>
                        <Link to="/">FAQ </Link>
                    </ul>
                </div>
                <div className="footer-column email1">
                    <h3>Contato</h3>
                    <form onSubmit={handleSubmit} className="footer-form">
                        <input
                            type="email"
                            placeholder="Seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer1;