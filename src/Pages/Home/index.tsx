import React from 'react';

const Home: React.FC = () => {

    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    return (
        <div>
            <h2>Bienvenido a la Página de Home</h2>
            <p>Esta es la página de Home de la aplicación.</p>
        </div>
    );
}

export default Home;
