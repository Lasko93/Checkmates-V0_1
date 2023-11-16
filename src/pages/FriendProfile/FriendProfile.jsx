import React from 'react';
import './FriendProfile.css';
import PlayIcon from "../../assets/images/Play_Icon.svg";
import FriendsIcon from "../../assets/images/friends_icon.svg";

import { useParams } from "react-router-dom";
import { useFetchUser } from "../../services/UserService";
import FriendlistComponent from "../../components/FriendlistComponent/FriendlistComponent"

import TestProfilePicture from "../../assets/images/PlayerIcon.svg";
import {useFetchProfilePicture} from "../../services/UserService";


const FriendProfile = () => {
    const {userName}  = useParams();
    console.log(userName)
    const { data: userData, isLoading, isError } = useFetchUser(userName);


    const profilePictureUser = useFetchProfilePicture(userName);

    let profilePictureUserUrl = TestProfilePicture; // Standardbild
    if (profilePictureUser.isSuccess && profilePictureUser.data && profilePictureUser.data.images) {
        profilePictureUserUrl = `data:${profilePictureUser.data.type};base64,${profilePictureUser.data.images}`;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !userData) {
        console.log(isError);
        return <div>Error loading profile or no user data available.</div>;
    }


    return (
        <div className='profile'>
            <h1>{userData.userName}'s Profile</h1>

            <div className='profile-data'>

               <p>
                   <img className="profile-Picture"
                        src={profilePictureUserUrl}
                        alt="Profile"/>
                </p>
                <p>Name: {userData.firstName} {userData.lastName}</p>

                <br/>
                <p><img className="playIcon" src= {PlayIcon} alt="PlayIcon"/><br/>
                    {userData.score} Points </p>
                <br/>
                {userData.friendlistVisible && (
                    <div>
                        <img className="FriendsIcon" src={FriendsIcon} alt="FriendsIcon"/>
                        <h2>{userName}'s friends</h2>
                        <FriendlistComponent userName={userName}/>
                    </div>
                    )}
            </div>
        </div>
    );
};

export default FriendProfile;