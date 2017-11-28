import {createAsyncConst} from "services/redux";
import {API_DELETE, API_GET, API_POST, API_UPDATE} from "../constants";

const RESET = 'city/RESET';

const CREATE_CITY = createAsyncConst('CREATE_CITY');
const GET_CITY = createAsyncConst('GET_CITY');
const GET_CITIES = createAsyncConst('GET_CITIES');
const CITIES = createAsyncConst('CITIES');
const DEFAULT_ASYNC = createAsyncConst('CITY_DEFAULT_ASYNC');

const initialState = {
    cities: [],
    errors: [],
    city: null,
    loading: false,
    success: false,
    failed: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_CITIES.SUCCESS:
            return {...state, cities: action.data.data};
        case GET_CITY.SUCCESS:
            return {...state, city: action.data.data};

        case CREATE_CITY.SUCCESS:
            return {...state, city: action.data.data};
        case CREATE_CITY.FAILED:
            return {...state};

        case DEFAULT_ASYNC.PENDING:
            return {...state, loading: true, success: false};
        case DEFAULT_ASYNC.SUCCESS:
            return {...state, loading: false, success: true};
        case DEFAULT_ASYNC.FAILED:
            return {...state, loading: false, failed: true};

        case RESET:
            return {...state, ...initialState};

        default:
            return state;
    }
}
export const getCities = () => ({
    type: API_GET,
    url: `/city`,
    next: GET_CITIES,
    default: DEFAULT_ASYNC
});

export const storeCity = (name) => ({
    type: API_POST,
    url: `/city`,
    data: {name},
    next: CITIES,
    default: DEFAULT_ASYNC
});

export const editCity = (id) => ({
    type: API_GET,
    url: `/city/${id}`,
    next: GET_CITY,
    default: DEFAULT_ASYNC
});

export const updateCity = (id, name) => ({
    type: API_UPDATE,
    url: `/city`,
    data: {id, name},
    next: CITIES
});

export const destroyCity = (id) => ({
    type: API_DELETE,
    url: `/city/${id}`,
    next: CITIES
});

export const reset = () => ({
    type: RESET
});
