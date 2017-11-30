import {createAsyncConst} from "services/redux";
import {API_DELETE, API_GET, API_POST, API_UPDATE} from "../../constants";

const RESET = 'city/RESET';
const SET_CITY_NAME = 'city/SET_CITY_NAME';

const CREATE_CITY = createAsyncConst('CREATE_CITY');
const UPDATE_CITY = createAsyncConst('UPDATE_CITY');
const EDIT_CITY = createAsyncConst('GET_CITY');
const GET_CITIES = createAsyncConst('GET_CITIES');
const CITIES = createAsyncConst('CITIES');

const initialState = {
    cities: [],
    errors: [],
    city: {
        name: '',
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

        case EDIT_CITY.PENDING:
            return {...state, manageLoading: true};
        case EDIT_CITY.SUCCESS:
            return {...state, manageLoading: false, city: action.data.data};
        case EDIT_CITY.ERROR:
            return {...state, ...action.asyncStatus};

        case GET_CITIES.PENDING:
            return {...state, ...action.asyncStatus};
        case GET_CITIES.SUCCESS:
            return {...state, ...action.asyncStatus, cities: action.data.data};
        case GET_CITIES.ERROR:
            return {...state, ...action.asyncStatus};

        case CREATE_CITY.SUCCESS:
            return {...state, city: action.data.data};
        case CREATE_CITY.FAILED:
            return {...state};

        case SET_CITY_NAME:
            return {...state, city: {...state.city, [action.name]: action.value}};

        case RESET:
            return {...state, ...initialState};

        default:
            return state;
    }
}

export const setField = (value, name) => ({
    type: SET_CITY_NAME,
    name, value
});

export const getCities = () => ({
    type: API_GET,
    payload: {
        url: `/city`,
    },
    next: GET_CITIES,
    module: 'index'
});

export const storeCity = (name) => ({
    type: API_POST,
    payload: {
        url: `/city`,
        data: {name},
    },
    next: CITIES,
    module: 'manage'
});

export const editCity = (id) => ({
    type: API_GET,
    payload: {
        url: `/city/${id}`,
    },
    next: EDIT_CITY,
    module: 'manage'
});

export const updateCity = (id, name) => ({
    type: API_UPDATE,
    url: `/city`,
    data: {id, name},
    next: UPDATE_CITY,
    module: 'manage'
});

export const destroyCity = (id) => ({
    type: API_DELETE,
    url: `/city/${id}`,
    next: CITIES,
    module: 'manage'
});

export const reset = () => ({
    type: RESET
});
