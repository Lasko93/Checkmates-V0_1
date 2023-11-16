import React from "react";
import './CheckActiveMatchComponent.css'

//Components
import ButtonComponent from "../Buttons/ButtonComponent";

//Services and Hooks
import {checkUserInGamesAndGetId, useDeleteGame} from "../../services/GameService";
import {useNavigate} from "react-router-dom";

const CreateActiveMatchPopup = ({ isOpen, onClose, text }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem('userName');
    const { mutate: deleteGame } = useDeleteGame();

    // Handler to delete the active game
    const handleDeleteGame = async () => {
        const activeGameId = await checkUserInGamesAndGetId(username);
        deleteGame(activeGameId, {
            onSuccess: () => console.log('Game deleted successfully'),
            onError: (error) => console.error('Failed to delete the game', error)
        });
        onClose();
        navigate('/');
    };

    // Handler to continue with the active game
    const handleContinue = async () => {
        const activeGameId = await checkUserInGamesAndGetId(username);
        if (activeGameId) {
            navigate(`/lobby/${activeGameId}`);
        }
        onClose();
    };

    // Early return if popup is not open
    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup-container">
            <div className="popup_isActive">
                <h2 className="PopupHeadlines">{text}</h2>
                <div className="PopupButtons">
                    <ButtonComponent text="Continue" buttonID="ContinueButton" onClick={handleContinue} />
                    <ButtonComponent text="Exit Lobby" buttonID="GiveUpButton" onClick={handleDeleteGame} />
                </div>
            </div>
        </div>
    );
};

export default CreateActiveMatchPopup;