import React, {useState} from 'react';
import './HomePage.css'

//Components
import ChessboardComponent from "../../components/ChessboardComponent/ChessboardComponent";
import ButtonComponent from "../../components/Buttons/ButtonComponent";
import CreateActiveMatchPopup from "../../components/CheckActiveMatchComponent/CheckActiveMatchComponent";
import {checkUserInGamesAndGetId} from "../../services/GameService";
import CreateLobbyPopup from "../../components/LobbyComponents/CreateLobbyComponent/CreateLobbyPopup";
import {toast} from "react-toastify";

//Services and Hooks
import CustomRequest from "../../components/RequestComponent/CustomRequestComponent/CustomRequest";




function HomePage() {

    localStorage.setItem("userName","BumsDums244")
    const username = localStorage.getItem('userName');

    // State for toggling popups
    const [activeMatchPopup, setActiveMatchPopup] = useState(false);
    const [lobbyPopup, setLobbyPopup] = useState(false);

    // Handler for toggling Active Match Popup
    const toggleActiveMatchPopup = () => {
        setActiveMatchPopup(!activeMatchPopup);
    };

    // Handler for toggling Lobby Popup
    const toggleLobbyPopup = () => {
        setLobbyPopup(!lobbyPopup);
    };

    // Handler for Play button
    const handlePlayButton = async () => {
        if (!username) {
            toast.error('Please log in to play online');
            return;
        }

        const hasActiveMatches = await checkUserInGamesAndGetId(username);

        if (hasActiveMatches) {
            toggleActiveMatchPopup();
        } else {
            toggleLobbyPopup();
        }
    };

    return (
        <div>
            <CustomRequest UserWithRequests={username} />
            <CreateActiveMatchPopup isOpen={activeMatchPopup} onClose={toggleActiveMatchPopup} text="You are still in a Lobby..." />
            <CreateLobbyPopup isOpen={lobbyPopup} onClose={toggleLobbyPopup} />
            <div className="ChessPositioner">
                <ChessboardComponent ChessboardSize="33vw" />
            </div>
            <div className="HomePageTitle">
                <h1>Connect, Challenge, and Conquer: Online Chess with Friends</h1>
            </div>
            <div className="StartButtons">
                <ButtonComponent text="Play Online" buttonID="PlayOnlineButton" onClick={handlePlayButton} />
                <ButtonComponent text="Challenge Computer" buttonID="ChallengeComputer" onClick={null} />
            </div>
        </div>
    );
}

export default HomePage;