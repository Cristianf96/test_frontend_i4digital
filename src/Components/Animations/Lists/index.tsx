import { Player } from '@lottiefiles/react-lottie-player';
import searchFiles from '../../../assets/Animations/JSONs/searchFiles.json'

const SearchFilesComponent = () => {
    return (
        <Player
            autoplay
            loop
            src={searchFiles}
            style={{ height: '300px', width: '300px' }}
        >
        </Player>
    )
}

export default SearchFilesComponent