import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux';

import {
    authAccessToken,
    authUserId
  } from "../../store/reducer/authSlice";

import { getUserTasks } from '../../misc/services';

import './ViewBoardUserTasks.css';
 
const ViewBoardUserTasks = () => {

    //no prop
    //state
    const [userTasks, setUserTasks] = useState({}) ;
    //store
    const token = useSelector(authAccessToken);
    const idUser = useSelector(authUserId);
    //no param
    //no local variable

    useEffect(() => {
        getUserTasks(idUser, token)
        .then( response => {
            if (response.status === 'ok') {            
                setUserTasks(response.data);
            }
            else {
            }
        })
        .catch(error => {   
        })
    },[idUser, token]);

    const _displayTasks = () => {

        return(
            <ul>
                { userTasks.map(task =>
                <li key={task.id}> {task.title} </li>)}
            </ul>
        );
    }

    return (
        <div className="user-tasks">
        { //s'il y a des tasks à afficher
            userTasks.length > 0 ? 
                _displayTasks()
            :
                <p className="message">Il n'y a pas de tâches à afficher...</p>
        }
    </div>
    )
}
 
export default ViewBoardUserTasks;