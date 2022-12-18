import { 
    selectUsers,
    usersResolved,
    usersRejected,
    addUserResolved
} from '../store/reducer/usersSlice'

import { API_BASE_URL } from './constants';



//const isOK = response => response.ok ? response.json() : Promise.reject(new Error('Problème côté serveur !!'));

export function loginUser (email, password) {
    const url = API_BASE_URL + '/login';
    return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})})
    .then(response=>{
        return response.json().then(data=>{
            if (response.status === 200)
                return { status: 'ok', accessToken: data.access_token, refreshToken: data.refresh_token, userId: data.user_id}
            if (response.status === 401)
                return { status: data.message}
            })
        })  
    .catch(err => {
        return {status: err}
    });
}

export function fetchUsers(store) {
    const status = selectUsers(store.getState()).status
    const url = API_BASE_URL + '/users';

    if (status === 'resolved' || status === 'rejected') {
        // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée ou en cas de problème antérieur
        return
    }

    return fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}})
    .then(response=>{
        return response.json().then(data => {
            if (response.status === 200)
                store.dispatch(usersResolved(data.users))
            else 
                store.dispatch(usersRejected(data.message))
            })
        })  
    .catch(error => {
        store.dispatch(usersRejected(error.message))
    });
}

export function getUser (userId, token) {
    const url = API_BASE_URL + '/users/' + userId;

    return fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': "Bearer "+token}})
    .then( response => {
        return response.json().then(data => {
            if (response.status === 200){
                return { status: 'ok', data: data.user}
            }
            else
                // cas prévu : 401 et 404
                return { status: data.message}
            })
        })  
    .catch(err => {
        return {status: err}
    });
}

export function getUserProjects (userId, token) {
    const url = API_BASE_URL + '/users/' + userId+ "/projects";

    return fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': "Bearer "+token}})
    .then( response => {
        return response.json().then(data => {
            if (response.status === 200){
                return { status: 'ok', data: data.projects}
            }
            else
                // cas prévu : 401 et 404
                return { status: data.message}
            })
        })  
    .catch(err => {
        return {status: err}
    });
}

export function getUserTasks (userId, token) {
    const url = API_BASE_URL + '/users/' + userId + '/tasks';

    return fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': "Bearer "+token}})
    .then( response => {
        return response.json().then(data => {
            if (response.status === 200){
                return { status: 'ok', data: data.tasks}
            }
            else
                // cas prévu : 401 et 404
                return { status: data.message}
            })
        })  
    .catch(err => {
        return {status: err}
    });
}

export function fetchAddUser (data, store) {
    const url = API_BASE_URL + '/users';
 
    let userData = data
    return fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
        .then( response => {
            return response.json().then(data=>{
                if (response.status === 201){
                    store.dispatch(addUserResolved({...userData, id: data.user_id}))
                    return { status: 'ok', data: data.user_id}
                }
                else 
                    // cas prévu : 401 et 400
                    // TODO à vérifier
                    //store.dispatch(addUserRejected(data.message))
                    return { status: data.message}
                })
        })
        .catch(error => {
            //store.dispatch(addUserRejected(error.message))
            return { status: error.message}
        });
}
