import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
    authAccessToken,
  } from "../../store/reducer/authSlice";

import './User.css';

import { getUser } from '../../misc/services';
// import { useFetch } from '../../misc/useFetch'
import { getNameAccessFromId } from '../../misc/constants';

const User = () => {

    //no prop
    //state
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true);   
    const [userData, setUserData] = useState({}) ;
    //store
    const token = useSelector(authAccessToken);
    //param
    const idUser = useParams().id;
    //local variables
    //const service = async () => getUser(idUser, token);

    //const { userData, loading, error } = useFetch(service);

    
    const _displayError = () => {
      return (
          <div>
              <p className="message">{error.message}</p>
          </div>
      )
    }

  useEffect(() => {
      getUser(idUser, token)
      .then( response => {
          if (response.status === 'ok') {            
              setUserData(response.data);
              setLoading(false);
          }
          else {
              setError({ message: response.status });
              setLoading(false);
          }
      })
      .catch(error => {
        setError({ message: error });
        setLoading(false);          
      })
  },[idUser, token]);
  
  return(
    <div className="board">
      <h1>Profil Utilisateur</h1>
      { loading && <p className="message">Loading...</p>}
      { !loading && error && _displayError() }
      { !loading && !error && 
                  <div className="user-profil">
                  <div>
                      <span>Nom utilisateur</span>
                      <p>{userData.username}</p>
                  </div>
                  <div>
                      <span>Adresse mél</span>
                      <p>{userData.email}</p>
                  </div>
                  <div>
                      <span>Droits d'accès</span>
                      <p>{getNameAccessFromId(userData.access)}</p>
                  </div>           
                </div>
      }
    </div>    
  );  
}    

export default User;
