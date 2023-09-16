import { Player } from '@lottiefiles/react-lottie-player';
import loadingLoginAnimation from '../../../assets/Animations/JSONs/loadingLoginAnimation.json'

const LoadingLoginComponent = () => {
    return (
        <Player
            autoplay
            loop
            src={loadingLoginAnimation}
            style={{ height: '300px', width: '300px' }}
        >
        </Player>
    )
}

export default LoadingLoginComponent