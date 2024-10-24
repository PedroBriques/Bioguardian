import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import "../Style/Navbar.css";

const Navbaradm = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={require("../Imagens/logo-removebg-preview-removebg-preview.png")} alt="Logo" className="logo" />
                    </Link>
                </div>
                <ul className="navbar-links">
                    
                    {/* Pagina Faltando*/}
                    <li>
                        <Link to="/" className="nav-link">
                            <HomeIcon className="icon" /> <span>Home</span>
                        </Link>
                    </li>
                    

                    <li>
                        <Link to="/Funcionarios" className="nav-link">
                            <InfoIcon className="icon" /> <span>Funcionarios</span>
                        </Link>
                    </li>
                    
                     {/* Pagina Faltando*/}
                    <li>
                        <Link to="/" className="nav-link">
                            <LocalMallIcon className="icon" /> <span>Clientes</span>
                        </Link>
                    </li>
                    
                    {/* Pagina Faltando*/}
                    <li>
                        <Link to="/" className="nav-link">
                            <ContactMailIcon className="icon" /> <span>Salario do medico</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to="/TabelaUsuarios" className="nav-link">
                            <LocalMallIcon className="icon" /> <span>Registros</span>
                        </Link>
                    </li>
                      
                </ul>
            </div>
        
            <div className="navbar-right">
                <div className="user-avatar">
                    <img
                        src={require("../Imagens/Calvo-removebg-preview.png")} 
                        alt="User Avatar"
                        className="avatar"
                    />
                </div>
            </div>
    
        </nav>
    );
};

export default Navbaradm;
