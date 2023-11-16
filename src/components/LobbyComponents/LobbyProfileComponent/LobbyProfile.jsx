import React from 'react';
import "./LobbyProfile.css"

const LobbyProfile = ({ ContainerName, ProfileImage, PlayerName, PlayerPoints }) => {
    return (
        <div className={`${ContainerName}`}>
            <div className="OuterCard">
                <div className="CircledProfile">
                    <img src={ProfileImage} alt="Player Profile" />
                </div>
                <div className="NameAndPoints">
                    <div className="PlayerName" >
                        <p>{PlayerName}</p>
                    </div>
                    <div className="PlayerPoints">
                        <p>{PlayerPoints}</p>
                    </div>
                </div>
            </div>
        </div>
            )
}

export default LobbyProfile;