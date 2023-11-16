import React from 'react';
import { useFetchAllFriends } from '../../services/FriendService';
import './FriendlistComponent.css';
import FriendlistBox from "./FriendlistBox";

const FriendlistComponent = ({ userName }) => {
    const { data: friendsList, isLoading, isError } = useFetchAllFriends(userName);


    if (isLoading) return <div>Loading friends...</div>;
 //   if (isError || !friendsList) return <div>Error loading friends list.</div>;


    return (
        <div className="friendlist">
            {friendsList && friendsList.length > 0 ? (
                <ul>
                    {friendsList.map((friend, index) => (
                        <FriendlistBox key={index} friend={friend} />
                    ))}
                </ul>
            ) : (
                <p>No friends found.</p>
            )}
        </div>
    );
};

export default FriendlistComponent;