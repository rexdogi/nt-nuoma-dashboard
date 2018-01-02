import {createAsyncConst} from "services/redux";
import {API_DELETE, API_GET, API_POST, API_UPDATE} from "../../constants";
import {goBack} from 'react-router-redux';

const RESET = 'user/RESET';
const SET_USER_FIELD = 'user/SET_USER_FIELD';

const GET_USERS = createAsyncConst('GET_USERS');
const CREATE_USER = createAsyncConst('CREATE_USER');
const STORE_USER = createAsyncConst('STORE_USER');
const EDIT_USER = createAsyncConst('EDIT_USER');
const UPDATE_USER = createAsyncConst('UPDATE_USER');
const DESTROY_USER= createAsyncConst('DESTROY_USER');

const initialState = {
    users: [],
    indexErrors: [],
    manageErrors: [],
    user: {
        id: null,
        email: '',
        firstName: '',
        lastName: ''
    },
    indexLoading: false,
    indexSuccess: false,
    indexFailed: false,
    manageLoading: false,
    manageSuccess: false,
    manageFailed: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_USERS.PENDING:
            return {...state, ...action.asyncStatus};
        case GET_USERS.SUCCESS:
            return {...state, indexLoading: false, users: action.data.data};
        case GET_USERS.FAILED:
            return {...state, ...action.asyncStatus};

        case CREATE_USER.PENDING:
            return {...state, ...action.asyncStatus, manageErrors: []};
        case CREATE_USER.SUCCESS:
            return {...state, ...action.asyncStatus};
        case CREATE_USER.FAILED:
            return {...state, ...action.asyncStatus, manageErrors: action.validationErrors};

        case EDIT_USER.PENDING:
            return {...state, ...action.asyncStatus};
        case EDIT_USER.SUCCESS:
            return {...state, manageLoading: false, user: action.data.data};
        case EDIT_USER.FAILED:
            return {...state, ...action.asyncStatus};

        case UPDATE_USER.PENDING:
            return {...state, ...action.asyncStatus};
        case UPDATE_USER.SUCCESS:
            return {...state, ...action.asyncStatus};
        case UPDATE_USER.FAILED:
            return {...state, ...action.asyncStatus, manageErrors: action.validationErrors};

        case DESTROY_USER.PENDING:
            return {...state, ...action.asyncStatus};
        case DESTROY_USER.SUCCESS:
            return {...state, ...action.asyncStatus};
        case DESTROY_USER.FAILED:
            return {...state, ...action.asyncStatus};

        case SET_USER_FIELD:
            return {...state, user: {...state.user, [action.name]: action.value}};

        case RESET:
            return {...state, ...initialState};

        default:
            return state;
    }
}

export const setField = (value, name) => ({
    type: SET_USER_FIELD,
    name, value
});

export const getUsers = () => ({
    type: API_GET,
    payload: {
        url: `/user`,
    },
    next: GET_USERS,
    module: 'index'
});

export const storeUser = (user) => ({
    type: API_POST,
    payload: {
        url: `/user`,
        data: user
    },
    next: CREATE_USER,
    module: 'manage'
});

export const editUser = (id) => ({
    type: API_GET,
    payload: {
        url: `/user/${id}`,
    },
    next: EDIT_USER,
    module: 'manage'
});

export const updateUser = (user) => ({
    type: API_UPDATE,
    payload: {
        url: `/user`,
        data: user,
    },
    next: UPDATE_USER,
    module: 'manage'
});

export const destroyUser = (id) => ({
    type: API_DELETE,
    payload: {
        url: `/user/${id}`,
    },
    next: DESTROY_USER,
    module: 'manage',
    onSuccess: onDeleteSuccess
});

export const reset = () => ({
    type: RESET
});

const onDeleteSuccess = (data, dispatch) => {
    dispatch(goBack());
};