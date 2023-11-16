import React from "react";
import "./CustomRequest.css"
import { useNavigate } from 'react-router-dom';
import PlayerRequestComponent from "./PlayerRequestComponent";
import {useFetchPendingGameRequestsByBlackUsername, useAcceptGameRequest,useDeclineGameRequest} from "../../../services/GameRequestService";
import {toast} from "react-toastify";
import {
    useAcceptFriendRequest,
    useDeleteFriendRequest,
    useFetchAllFriendRequests
} from "../../../services/FriendService";
import {checkUserInGamesAndGetId, useDeleteGame} from "../../../services/GameService";

const CustomRequest = ({UserWithRequests}) => {


    const inviteGameText = "has invited you to a match!";
    const inviteFriendText ="wants to be your friend!";

    const navigate = useNavigate();

    const { mutate: deleteGame } = useDeleteGame();

    //Getting all pending game requests
    const { data: pendingRequests, isLoading, isError, error } = useFetchPendingGameRequestsByBlackUsername(UserWithRequests);
    const declineMutation = useDeclineGameRequest();
    const acceptMutation = useAcceptGameRequest();

    //Getting all friend requests
    const { data: allFriendRequests, isLoading: isLoadingFriends, isError: isErrorFriends, error: errorFriends } = useFetchAllFriendRequests(UserWithRequests);
    const acceptFriendMutation = useAcceptFriendRequest();
    const declineFriendMutation = useDeleteFriendRequest();
    console.log(allFriendRequests);

/*
       // TODo handling loadings
    if (isLoadingFriends) {
        return <div>Loading game requests...</div>;
    }

    if (isErrorFriends) {
        return <div>Error fetching game requests: {error.message}</div>;
    }

*/

    const handleDeleteGame = async () => {
        const activeGameId = await checkUserInGamesAndGetId(UserWithRequests);
        if (activeGameId) {
            deleteGame(activeGameId, {
                onSuccess: () => {
                    console.log('Game deleted successfully');
                    // Additional logic if needed after deleting the game
                },
                onError: (error) => {
                    console.error('Failed to delete the game', error);
                }
            });
        }
    };

    return(
        <div className="RequestContainer" >
            {pendingRequests && pendingRequests.map(request => (
                <PlayerRequestComponent
                    key={request.id}
                    InviteText={inviteGameText}
                    InvitingPlayer={request.white?.username} // Assuming 'whiteId' is the username of the inviting player
                    acceptButton={() => {
                        acceptMutation.mutate(
                            { requestId: request.id, blackUsername: UserWithRequests },
                            {
                                onSuccess: () => {
                                    handleDeleteGame();
                                    navigate(`/lobby/${request.game.id}`)
                                },
                                onError: (error) => toast.error("Lobby full, closed or game started")
                            }
                        );
                    }}
                    declineButton={() => declineMutation.mutate(
                        {requestId: request.id, blackUsername: UserWithRequests },
                        {
                            onError: (error) => toast.error("Lobby full, closed or game started")
                        }
                        )}
                />
            ))}
            {allFriendRequests && allFriendRequests?.map(request => (
                <PlayerRequestComponent
                    key={request?.id}
                    InviteText={inviteFriendText}
                    InvitingPlayer={request?.sender}
                    acceptButton={() => acceptFriendMutation.mutate(
                        { user: request?.receiver, yesFriend: request?.sender }
                    )}
                    declineButton={() => declineFriendMutation.mutate(
                        { receiver: request?.receiver, noFriend: request?.sender }
                    )}
                />
            ))}
        </div>

    );
}


export default CustomRequest;