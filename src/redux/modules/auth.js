import {get, post} from 'services/http';
import {push} from 'react-router-redux';
import {decode, getAuthData} from "services/auth";
import {createAsyncConst} from "services/redux";

const LOGIN = createAsyncConst('LOGIN');
const REGISTER = createAsyncConst('REGISTER');

const LOGIN_STARTED = 'login/LOGIN_STARTED';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILED = 'login/LOGIN_FAILED';
const REGISTER_STARTED = 'login/REGISTER_STARTED';
const REGISTER_SUCCESS = 'login/REGISTER_SUCCESS';
const REGISTER_FAILED = 'login/REGISTER_FAILED';
export const SET_USER_OBJECT = 'login/SET_USER_OBJECT';
const LOGOUT = 'login/LOGOUT';

const initialState = {
    registerPending: false,
    registerSuccess: false,
    registerFailed: false,
    loginPending: false,
    loginSuccess: false,
    loginFailed: false,

    loggedIn: false,
    errors: [],
    user: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN.PENDING:
            return {...state, ...action.asyncStatus, errors: []};
        case LOGIN.SUCCESS:
            return {...state, ...action.asyncStatus};
        case LOGIN.FAILED:
            return {...state, ...action.asyncStatus, errors: action.payload.errors};
        case REGISTER.PENDING:
            return {...state, ...action.asyncStatus, errors: []};
        case REGISTER.SUCCESS:
            return {...state, ...action.asyncStatus};
        case REGISTER.FAILED:
            return {...state, ...action.asyncStatus, errors: action.payload.errors};
        case SET_USER_OBJECT:
            return {...state, user: action.payload.user, loggedIn: action.payload.status};
        case LOGOUT:
            return {...state, loggedIn: false, user: null}
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
            const token = data.headers.authorization;
            setToken(token);
            document.cookie = "id_token=" + token;
            dispatch({type: LOGIN_SUCCESS});
            dispatch({type: SET_USER_OBJECT, payload: getAuthData(token)});
            dispatch(push('/dashboard'))
        }).catch((err) => {
            console.log(err)
            if(err.response) {
                dispatch({
                    type: LOGIN_FAILED, payload: {
                        errors: err.response.data.errors
                    }
                });
            }
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
            if(err.response) {
                dispatch({
                    type: REGISTER_FAILED, payload: {
                        errors: err.response.data.errors
                    }
                });
            }
        })
    }
}

export function logout() {
    localStorage.removeItem('id_token')
    return {
        type: LOGOUT
    }
}

function setToken(idToken) {
    localStorage.setItem('id_token', idToken)
}
