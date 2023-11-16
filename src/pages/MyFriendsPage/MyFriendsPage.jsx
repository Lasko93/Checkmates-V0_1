import React, { useContext } from 'react'; // Hinzufügen von useState zum Import
import './MyFriendsPage.css';
import FriendsIcon from "../../assets/images/friends_icon.svg";
import FriendlistComponent from "../../components/FriendlistComponent/FriendlistComponent"
import RequestComponent from "../../components/RequestComponent/RequestComponent";
import { FriendListContext } from './FriendListContext';
import {useParams} from "react-router-dom";



function MyFriendsPage() {
    const { friendsList, addToFriendsList } = useContext(FriendListContext);
    const userName = localStorage.getItem('userName');

    return (
        <div className="Friendlist">
            <h2>Received Friend Requests</h2>
            {/* Übergeben von addToFriendsList direkt als Prop */}
            <RequestComponent text="View Friend Requests" buttonID="friendrequests" addToFriendsList={addToFriendsList}/>
            <div>
                <br/><br/><br/>
                <img className="FriendsIcon" src={FriendsIcon} alt="FriendsIcon"/>
                <h1>My friends</h1>
            </div>
            <FriendlistComponent userName={userName}/>
        </div>
    );
}
export default MyFriendsPage;