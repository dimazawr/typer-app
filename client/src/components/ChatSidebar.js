import React from 'react';
import { useSelector } from 'react-redux';


export const ChatSidebar = () => {

    const users = useSelector(state => state.users);

    const roomName = useSelector(state => state.user.room);

    let userRoomId = 0;

    let usersList = users.map(user => {
        // perhaps, there is a better solution for a key, imo just random string is good enough
        userRoomId++;
        return <li key={`${user.room}_id_${userRoomId}`} className="list-group-item bg-dark">{user.username}</li>
    });

    return (
        <div className="d-inline-flex flex-column chat-sidebar">
            <p className="sidebar-title" >{roomName} room</p>
            <ul className="list-group-flush pl-0">
                {usersList}
            </ul>
        </div>
    )
}