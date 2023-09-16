import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.scss';

const Nav: React.FC = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.clear()
        navigate('/test_frontend_i4digital')
    }

    if (!token) {
        return null;
    }

    return (
        <nav className="nav">
            <ul>
                <div>
                    <li><Link to="/test_frontend_i4digital/inicio">Inicio</Link></li>
                </div>
                <div className='navigation'>
                    <li><Link to="/test_frontend_i4digital/nueva_encuesta">Nueva Encuesta</Link></li>
                    <li><Link to="/test_frontend_i4digital/listar_encuestas">Listar Encuestas</Link></li>
                    <li onClick={logout}>Cerrar Sesión</li>
                </div>
            </ul>
        </nav>
    );
}

export default Nav;
