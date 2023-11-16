import React from 'react'; // Hinzufügen von useState zum Import
import './MyFriendsPage.css';
import FriendsIcon from "../../assets/images/friends_icon.svg";
import FriendlistComponent from "../../components/FriendlistComponent/FriendlistComponent"





function MyFriendsPage() {
    const userName = localStorage.getItem('userName');

    return (
        <div className="Friendlist">

                <img className="FriendsIcon" src={FriendsIcon} alt="FriendsIcon"/>
                <h1>My friends</h1>
            <FriendlistComponent userName={userName}/>
        </div>
    );
}
export default MyFriendsPage;