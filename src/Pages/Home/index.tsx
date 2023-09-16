import React from 'react';
import Login from '../Auth/Login';
import './Home.scss'
import { Player } from '@lottiefiles/react-lottie-player';
import welcomeAnimation from '../../assets/Animations/JSONs/welcomeAnimation.json'

const Home: React.FC = () => {

    const token = localStorage.getItem('token');

    if (!token) {
        return <Login />;
    }

    return (
        <>
            <div className='home'>
                <Player
                    autoplay
                    loop
                    src={welcomeAnimation}
                    style={{ width: '600px' }}
                >
                </Player>
                <p>Esta es la página de Home de la aplicación.</p>
            </div>
        </>
    );
}

export default Home;
