import React from "react";
import './FriendlistBox.css'
import {Link} from "react-router-dom";


const FriendlistBox = ({ friend }) => {
    return (
        <div className="friend-box">
            <div className="friendusername">  {friend.userName} </div>
            <div className="friendnames">{friend.firstName} {friend.lastName} </div>
            <Link className="profillink" to={`/profile/${friend.userName}`}>View Profile</Link>
        </div>
    );
};

export default FriendlistBox