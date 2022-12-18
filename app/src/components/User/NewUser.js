import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';

import './NewUser.css';

import { ACCESS } from '../../misc/constants';
import { fetchAddUser } from '../../misc/services';

// TODO: mettre en place un loader pour le post et pour la mise à jour des données

const NewUser = () => {

    //no prop
    //state
    const [error, setError] = useState(null); 
    //const [loading, setLoading] = useState(false);
    //no store
    //no param
    //local variables
    const nameInput = useRef(null);
    const mailInput = useRef(null);
    const passwordInput = useRef(null);
    const accessSelect = useRef(null);
    const gitHubToken = useRef(null);
    const navigate = useNavigate();
    const store = useStore();
    //let dispatch = useDispatch(); 


    const _handleSubmit = (event) => {
        //pour éviter le rechargement de la page après cette fonction
        event.preventDefault();

        let user = {
            username: nameInput.current.value,
            email: mailInput.current.value,
            password: passwordInput.current.value,
            access: accessSelect.current.value,    
            gitHubToken: gitHubToken.current.value   
        };
        //setLoading(true);
        fetchAddUser(user, store)
        .then(response => {
            if (response.status === 'ok'){
                //setLoading(false);
                navigate("/board");
            }
            else {
                nameInput.current.value = "";
                mailInput.current.value = "";
                passwordInput.current.value = "";
                accessSelect.current.value = 0;
                gitHubToken.current.value = "";
                setError(response.status)
                //setLoading(false)
            }
        })
        .catch(error => {
            setError(error.message)})
    }

    const _displayError = () => {
        return (
            <div>
                <p className="message">{error}</p>
            </div>
        )
    }

    return (
        <div className="new-user">
            <h1>Ajout utilisateur</h1>
            <form onSubmit={_handleSubmit}>
                <div className='user-name'>
                    <input id="username" name="username" type="text" autoFocus placeholder="Nom" ref={nameInput}/>
                </div>
                <div className='user-mail'>
                    <input id="usermail" name="usermail" type="text" placeholder="Mail" ref={mailInput}/>
                </div>
                <div className='user-password'>
                    <input id="userpassword" name="userpassword" type="text" placeholder="Mot de passe" ref={passwordInput}/>
                </div>                
                <div className='user-access'>
                    <select id="access" name="access" ref={accessSelect}>
                        { ACCESS.map( obj => <option key = {obj.id} value = {obj.id}> {obj.name} </option>) }
                    </select>
                </div>
                <div className='user-githubtoken'>
                    <input id="githubtoken" name="githubtoken" type="text" placeholder="Git Hub Token" ref={gitHubToken}/>
                </div>
                <div className='controls'>
                    <input type="submit" value="Ajoutez un utilisateur" />
                </div>
            </form>
            { error && _displayError()}
        </div>
    )
}
 
export default NewUser;