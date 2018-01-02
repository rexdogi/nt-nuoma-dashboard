import {createAsyncConst} from "services/redux";
import {API_DELETE, API_GET, API_POST, API_UPDATE} from "../../constants";
import {goBack} from 'react-router-redux';

const RESET = 'property/RESET';
const SET_FIELD = 'property/SET_USER_FIELD';

const GET_PROPERTIES = createAsyncConst('GET_PROPERTIES');
const CREATE_PROPERTY = createAsyncConst('CREATE_PROPERTY');
const STORE_PROPERTY = createAsyncConst('STORE_PROPERTY');
const EDIT_PROPERTY = createAsyncConst('EDIT_PROPERTY');
const UPDATE_PROPERTY = createAsyncConst('UPDATE_PROPERTY');
const DESTROY_PROPERTY= createAsyncConst('DESTROY_PROPERTY');

const initialState = {
    properties: [],
    indexErrors: [],
    manageErrors: [],
    property: {
        id: null,
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

        case GET_PROPERTIES.PENDING:
            return {...state, ...action.asyncStatus};
        case GET_PROPERTIES.SUCCESS:
            return {...state, indexLoading: false, users: action.data.data};
        case GET_PROPERTIES.FAILED:
            return {...state, ...action.asyncStatus};

        case CREATE_PROPERTY.PENDING:
            return {...state, ...action.asyncStatus, manageErrors: []};
        case CREATE_PROPERTY.SUCCESS:
            return {...state, manageLoading: false};
        case CREATE_PROPERTY.FAILED:
            return {...state, ...action.asyncStatus, manageErrors: action.validationErrors};

        case STORE_PROPERTY.PENDING:
            return {...state, ...action.asyncStatus};
        case STORE_PROPERTY.SUCCESS:
            return {...state, manageLoading: false};
        case STORE_PROPERTY.FAILED:
            return {...state, ...action.asyncStatus};

        case EDIT_PROPERTY.PENDING:
            return {...state, ...action.asyncStatus};
        case EDIT_PROPERTY.SUCCESS:
            return {...state, manageLoading: false, property: action.data.data};
        case EDIT_PROPERTY.FAILED:
            return {...state, ...action.asyncStatus};

        case UPDATE_PROPERTY.PENDING:
            return {...state, ...action.asyncStatus};
        case UPDATE_PROPERTY.SUCCESS:
            return {...state, ...action.asyncStatus};
        case UPDATE_PROPERTY.FAILED:
            return {...state, ...action.asyncStatus, manageErrors: action.validationErrors};

        case DESTROY_PROPERTY.PENDING:
            return {...state, ...action.asyncStatus};
        case DESTROY_PROPERTY.SUCCESS:
            return {...state, ...action.asyncStatus};
        case DESTROY_PROPERTY.FAILED:
            return {...state, ...action.asyncStatus};

        case SET_FIELD:
            return {...state, user: {...state.user, [action.name]: action.value}};

        case RESET:
            return {...state, ...initialState};

        default:
            return state;
    }
}

export const setField = (value, name) => ({
    type: SET_FIELD,
    name, value
});

export const getProperties = () => ({
    type: API_GET,
    payload: {
        url: `/property`,
    },
    next: GET_PROPERTIES,
    module: 'index'
});

export const storeProperty = (data) => ({
    type: API_POST,
    payload: {
        url: `/property`,
        data: data
    },
    next: STORE_PROPERTY,
    module: 'manage'
});

export const editProperty = (id) => ({
    type: API_GET,
    payload: {
        url: `/property/${id}`,
    },
    next: EDIT_PROPERTY,
    module: 'manage'
});

export const updateProperty = (data) => ({
    type: API_UPDATE,
    payload: {
        url: `/property`,
        data: data,
    },
    next: UPDATE_PROPERTY,
    module: 'manage'
});

export const destroyProperty = (id) => ({
    type: API_DELETE,
    payload: {
        url: `/property/${id}`,
    },
    next: DESTROY_PROPERTY,
    module: 'manage',
    onSuccess: onDeleteSuccess
});

export const reset = () => ({
    type: RESET
});

const onDeleteSuccess = (data, dispatch) => {
    dispatch(goBack());
};