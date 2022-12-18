import React from 'react'

import './ViewBoardUsers.css';

import ViewUser from './ViewUser';
 
const ViewBoardUsers = ({users}) => {

    //prop
        //users : [{access: 2, id: 1, username: "fguntz"},{...},{...}]
    //no state
    //no store
    //no param
    //no local variable

    return (
        <div className="users-list">
        { //s'il y a des users à afficher
            users.length > 0 ? 
                users.map(user =>
                    <ViewUser key={user.id} user={user}/>)
            :
                <p className="message">Il n'y a pas d'utilisateurs à afficher...</p>
        }
    </div>
    )
}
 
export default ViewBoardUsers;