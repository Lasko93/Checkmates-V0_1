import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import './GameLobby.css'
import ChessboardComponent from "../../components/ChessboardComponent/ChessboardComponent";
import ButtonComponent from "../../components/Buttons/ButtonComponent";
import LobbyProfile from "../../components/LobbyComponents/LobbyProfileComponent/LobbyProfile";
import SearchForPlayerPopup from "../../components/SearchForPlayerComponent/SearchForPlayerPopup";
import ProfilePicture from'../../assets/images/PlayerIcon.svg'
import {useFetchProfilePicture} from "../../services/UserService";
import {
    checkUserInGamesAndGetId,
    useDeleteGame,
    useFetchGameById,
    useUpdateGameRemoveBlack
} from "../../services/GameService";
import CheckActiveMatchComponent from "../../components/CheckActiveMatchComponent/CheckActiveMatchComponent";
import {toast, useToast} from "react-toastify";
import {useQueryClient} from "react-query";

function GameLobby() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [SearchPlayerPopup, setSearchPlayerPopup] = useState(false);
    const { gameId } = useParams();
    const location = useLocation();
    const [MatchTimer, setMatchTimer] = useState("05");
    const { mutate: deleteGame } = useDeleteGame();
    const { mutate: removeBlackPlayer } = useUpdateGameRemoveBlack();

    const currentUser = localStorage.getItem('userName'); // or however you get the current user's name
    const { data: game, isLoading: isLoadingGame, isError: isErrorGame } = useFetchGameById(gameId);
    const isCurrentUserBlack = game && game.black && game.black.username === currentUser;
    const isCurrentUserWhite = game && game.white && game.white.username === currentUser;

    const profilePictureWhite = useFetchProfilePicture(game?.white?.username);
    const profilePictureBlack = useFetchProfilePicture(game?.black?.username);

    // Create the image URL for white player
    let profilePictureWhiteUrl = ProfilePicture; // default image
    if (profilePictureWhite.isSuccess && profilePictureWhite.data && profilePictureWhite.data.images) {
        profilePictureWhiteUrl = `data:${profilePictureWhite.data.type};base64,${profilePictureWhite.data.images}`;
    }


    // Create the image URL for black player
    let profilePictureBlackUrl = ProfilePicture; // default image
    if (profilePictureBlack.isSuccess && profilePictureBlack.data && profilePictureBlack.data.images) {
        profilePictureBlackUrl = `data:${profilePictureBlack.data.type};base64,${profilePictureBlack.data.images}`;
    }



    const [activeMatchPopup, setActiveMatchPopup] = useState(false);

    const toggleActiveMatchPopup = () => {
        setActiveMatchPopup(!activeMatchPopup);
    };

    //handle if gamedata is null or game is finished
    useEffect(() => {
        if (game && game.status === 'FINISHED'){
            navigate('/');
        } else if (!game && !isLoadingGame) {
            // Game data couldn't be fetched or doesn't exist
            toast.error("Lobby has been closed");
            navigate('/'); // Redirect to home page
        }
    }, [game, isLoadingGame, navigate]);




    useEffect(() => {
        if (game && game.timer) {
            setMatchTimer(game.timer);
        }
    }, [game]);


    const HandleMatchTimeOnChange = (event) => {
        setMatchTimer(event.target.value);
    };

    const togglePopup = () => {
        setSearchPlayerPopup(!SearchPlayerPopup);
    };



    const handleLeaveAsBlack = () => {
        removeBlackPlayer(gameId, {
            onSuccess: () => {
                // Handle successful removal
                navigate('/');
            },
            onError: (error) => {
                // Handle error scenario
                console.error('Error removing black player:', error);
            },
        });
    };

    const handleLeaveAsWhite = async () => {
        toggleActiveMatchPopup();
            }


    const handleLeaveButton = () => {
        if (isCurrentUserBlack) {
            handleLeaveAsBlack();
        } else if (isCurrentUserWhite) {
            handleLeaveAsWhite();
        } else {
            // Handle case where the current user is neither black nor white
        }
    };

    const kickBlackPlayer = () => {
        if (!game || !game.black) {
           toast.error("There is no black player to kick")
        }
        else {
            removeBlackPlayer(gameId, {
                onSuccess: () => {
                    toast.error("Black player has been kicked")
                    // Invalidate and refetch game data
                    queryClient.invalidateQueries(['game', gameId]);
                },
                onError: (error) => {
                    console.error('Error kicking black player:', error);
                },
            });
        }

    };


    return (
        <div>
            <SearchForPlayerPopup isOpen={SearchPlayerPopup} onClose={togglePopup} gameId={gameId}/>
            <CheckActiveMatchComponent isOpen={activeMatchPopup} onClose={toggleActiveMatchPopup} text="Are you sure? Lobby will be destroyed...."/>
            <div>
                <LobbyProfile
                    ContainerName="PlayerBlack"
                    ProfileImage={profilePictureBlackUrl || ProfilePicture}
                    PlayerName={game?.black?.username || "Waiting for Black Player..."}
                    PlayerPoints={game?.black?.score || 0}
                   />
                <LobbyProfile
                    ContainerName="PlayerBrown"
                    ProfileImage={profilePictureWhiteUrl || ProfilePicture}
                    PlayerName={game?.white?.username || "Waiting...."}
                    PlayerPoints={game?.white?.score || 0 }
                />
            </div>
            <div className="ChessPositionerGameLobby">
                <ChessboardComponent ChessboardSize="40vw"/>
            </div>
            <div className="LobbyOptionsContainer">
                <div className="LobbyName">
                    <p>{game?.gameName?.value || "THIS IS NUULLLLLL"}</p>
                </div>
                <div className="TimeSettings">
                    <p id="LobbyMinutes"> Minutes </p>
                    <input className="MatchTimeInput"
                           type="number"
                           value={MatchTimer}
                           onChange={HandleMatchTimeOnChange}
                           placeholder="05"
                           min="01"
                           disabled={!isCurrentUserWhite}
                    />
                </div>
                    <ButtonComponent
                        specificClassName={`LobbyOptionsButtons ${isCurrentUserBlack ? 'SmallButton' : ''}`}
                        text="Leave Lobby"
                        buttonID="DestroyLobbyButton"
                        onClick={handleLeaveButton}
                    />

                {/* Render other buttons if the current user is not the black player */}
                {!isCurrentUserBlack && (
                    <>
                        <ButtonComponent
                            specificClassName="LobbyOptionsButtons"
                            text="Kick Player"
                            buttonID="kickPlayer"
                            onClick={kickBlackPlayer}
                        />
                        <ButtonComponent
                            onClick={togglePopup}
                            specificClassName="LobbyOptionsButtons"
                            text="Invite a Player"
                            buttonID="LobbyInviteButton"
                        />
                        <ButtonComponent
                            specificClassName="LobbyOptionsButtons"
                            text="Start Game"
                            buttonID="StartGameButton"
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default GameLobby;
