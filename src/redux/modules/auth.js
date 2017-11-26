import {get, post} from 'services/http';
import {push} from 'react-router-redux';
import decoder from 'jwt-decode';

const LOGIN_STARTED = 'login/LOGIN_STARTED';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILED = 'login/LOGIN_FAILED';
const REGISTER_STARTED = 'login/REGISTER_STARTED';
const REGISTER_SUCCESS = 'login/REGISTER_SUCCESS';
const REGISTER_FAILED = 'login/REGISTER_FAILED';

const initialState = {
    isLoading: false,
    success: false,
    loggedIn: true,
    errors: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_STARTED:
            return {...state, isLoading: true, success: false, errors: []};
        case LOGIN_SUCCESS:
            return {...state, isLoading: false, success: true};
        case LOGIN_FAILED:
            return {...state, isLoading: false, errors: action.payload.errors};
        case REGISTER_STARTED:
            return {...state, isLoading: true, success: false, errors: []};
        case REGISTER_SUCCESS:
            return {...state, isLoading: false, success: true};
        case REGISTER_FAILED:
            return {...state, isLoading: false, errors: action.payload.errors};
        default:
            return state;
    }
}

export function login(email, password) {
    return (dispatch) => {
        dispatch({type: LOGIN_STARTED});
        return post('/login', {
            email: email,
            password: password
        }).then((data) => {
            console.log(data);
            setToken(data.headers.authorization);
            document.cookie = "id_token=" + data.headers.authorization;
            dispatch({type: LOGIN_SUCCESS});
            dispatch(push('/dashboard'))
        }).catch((err) => {
            console.log(err.response);
            dispatch({
                type: LOGIN_FAILED, payload: {
                    errors: err.response.data.errors
                }
            });
        })
    }
}

export function register(email, password) {
    return (dispatch) => {
        dispatch({type: REGISTER_STARTED})
        return post('/auth/register', {
            email: email,
            password: password
        }).then(() => {
            dispatch({type: REGISTER_SUCCESS})
        }).catch((err) => {
            console.log(err.response)
            dispatch({
                type: REGISTER_FAILED, payload: {
                    errors: err.response.data.errors
                }
            });
        })
    }
}

export function isLoggedIn() {
    console.log(getToken());
    /* const current_time = new Date().getTime() / 1000;
     if (current_time > jwt.exp) {
     }
     else {

     }*/
}

export function logout() {

}

function getToken() {
    return localStorage.getItem('id_token')
}

function setToken(idToken) {
    localStorage.setItem('id_token', idToken)
}

/*
setProfile(profile){
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
}

getProfile(){
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
}

setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
}

getToken(){
    return localStorage.getItem('id_token')
}

logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
}*/
