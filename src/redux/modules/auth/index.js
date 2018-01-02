import {push} from 'react-router-redux';
import {getAuthData} from "services/auth";
import {createAsyncConst} from "services/redux";
import {API_POST} from "../../constants";
const LOGIN = createAsyncConst('LOGIN');
const REGISTER = createAsyncConst('REGISTER');

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
    loginErrors: [],
    registerErrors: [],
    user: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN.PENDING:
            return {...state, ...action.asyncStatus, loginErrors: []};
        case LOGIN.SUCCESS:
            return {...state, ...action.asyncStatus};
        case LOGIN.FAILED:
            return {...state, ...action.asyncStatus, loginErrors: action.validationErrors};
        case REGISTER.PENDING:
            return {...state, ...action.asyncStatus, registerErrors: []};
        case REGISTER.SUCCESS:
            return {...state, ...action.asyncStatus};
        case REGISTER.FAILED:
            return {...state, ...action.asyncStatus, registerErrors: action.validationErrors};
        case SET_USER_OBJECT:
            return {...state, user: action.payload.user, loggedIn: action.payload.status};
        case LOGOUT:
            return {...state, loggedIn: false, user: null};
        default:
            return state;
    }
}


export const login = (email, password) => ({
    type: API_POST,
    next: LOGIN,
    payload: {
        url: `/login`,
        data: {
            email, password
        },
    },
    onSuccess: onLoginSuccess,
    module: 'login'
});

export const register = (email, password) => ({
    type: API_POST,
    next: REGISTER,
    payload: {
        url: `/register`,
        data: {
            email,
            password
        },
    },
    onSuccess: onRegisterSuccess(email, password),
    module: 'login'
});

export const onLoginSuccess = (data, dispatch) => {
    const token = data.headers.authorization;
    setToken(token);
    document.cookie = "id_token=" + token;
    dispatch({type: SET_USER_OBJECT, payload: getAuthData(token)});
    dispatch(push('/dashboard'));
};

export const onRegisterSuccess = (email, password) => (data, dispatch) => {
    dispatch(push('/login'));
};

export function logout() {
    localStorage.removeItem('id_token');
    return {
        type: LOGOUT
    }
}

function setToken(idToken) {
    localStorage.setItem('id_token', idToken)
}
