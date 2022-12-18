import React from 'react';
import { IconContext } from 'react-icons';
import { BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import './ViewUser.css';
 
const ViewList = ({user}) => {

    //prop
        //user : {access: 2, id: 1, username: "fguntz"}
    //no state
    //no store
    //no param
    //local variable
    let navigate = useNavigate();   

    const _handleClick = () => {
        navigate('/user/'+user.id)
    }

    return (
        <div className="user">
            <div className="avatar">
                <IconContext.Provider value={{ size: "3em"}}>
                    <BsPerson />
                </IconContext.Provider>
            </div>
            <div className="name">
                <span>{user.username}</span>
            </div>
            <div className="link" onClick={_handleClick}>
                <span>Voir fiche</span>
            </div>  
        </div>
    )
}
 
export default ViewList;