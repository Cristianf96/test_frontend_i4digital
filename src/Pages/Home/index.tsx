import React from 'react';
import Login from '../Auth/Login';

const Home: React.FC = () => {

    const token = localStorage.getItem('token');

    if (!token) {
        return <Login />;
    }

    return (
        <div>
            <h2>Bienvenido a la Página de Home</h2>
            <p>Esta es la página de Home de la aplicación.</p>
        </div>
    );
}

export default Home;
