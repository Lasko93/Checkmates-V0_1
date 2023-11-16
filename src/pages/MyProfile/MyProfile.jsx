import React, {useState} from 'react';
import './MyProfile.css';
import PlayIcon from "../../assets/images/Play_Icon.svg";
import FriendsIcon from "../../assets/images/friends_icon.svg";
import "../../components/Buttons/ButtonComponent.css";
import { useFetchUser} from "../../services/UserService";
import {useParams} from "react-router-dom";
import {useChangeFriendlistVisibility} from "../../services/FriendService";
import {useQueryClient} from "react-query";
import TestProfilePicture from "../../assets/images/PlayerIcon.svg";
import FriendlistComponent from "../../components/FriendlistComponent/FriendlistComponent";
import {useFetchProfilePicture} from "../../services/UserService";


const MyProfile = () => {
    const [isListPublic, setIsListPublic] = useState(true); // Zustand für die Sichtbarkeit der Freundesliste
    const userName = localStorage.getItem('userName');
    const queryClient = useQueryClient();

    const {data: userData,isLoading, isError} = useFetchUser(userName); // Hook, um Benutzerdaten zu laden
    const { mutate: changeVisibility } = useChangeFriendlistVisibility({
        onSuccess: () => {
            // Nach erfolgreicher Mutation Benutzerdaten erneut abfragen
            queryClient.invalidateQueries(['user', userName]);
        }
    });

    console.log(userName);
    const profilePictureUser = useFetchProfilePicture(userName);

    let profilePictureUserUrl = TestProfilePicture; // Standardbild
    if (profilePictureUser.isSuccess && profilePictureUser.data && profilePictureUser.data.images) {
        profilePictureUserUrl = `data:${profilePictureUser.data.type};base64,${profilePictureUser.data.images}`;
    }
    console.log(profilePictureUser);
    const toggleFriendListVisibility = () => {
       changeVisibility({userName, newVisibility: !isListPublic});
       setIsListPublic(!isListPublic);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !userData) {
        console.log(isError);
        return <div>Error loading profile or no user data available.</div>;
    }




    return(
        <div className='profile'>
           <h1>My Profile</h1>
            <div className='profile-data'>
              <h2>User: {userData.userName}</h2>

               <p>
                   <img className="profile-Picture"
                        src={profilePictureUserUrl}
                        alt="Profile"/>

                </p>
                <p>Name: {userData.firstName} {userData.lastName}</p>
                <p>E-Mail: {userData.email}</p>
                <br/>
                <p><img className="playIcon" src= {PlayIcon} alt="PlayIcon"/><br/>
                    {userData.score} Points </p>
                <br/>
                <p><img className="FriendsIcon" src= {FriendsIcon} alt="FriendsIcon"/>
                    <br/>
                    {userData.userName}'s friends

                     </p>
                <button className="GeneralButton" onClick={toggleFriendListVisibility}
                        style={{marginLeft:'30%', marginTop:'2%', width: '40%'}}>
                    {isListPublic ? 'Public Friendlist' : 'Secret Friendlist'}
                </button>
                <br/>
                {isListPublic && <FriendlistComponent userName={userName}/>}

            </div>
        </div>


    )
}
export default MyProfile
