import {createAsyncConst} from "services/redux";
import {normalize, denormalize} from 'normalizr';
import {getLanguages} from "redux/modules/language";
import * as schema from 'redux/schemas/citySchema';
import {API_DELETE, API_GET, API_POST, API_UPDATE} from "redux/constants";
import {goBack} from 'react-router-redux';

const RESET = 'city/RESET';
const SET_CITY_NAME = 'city/SET_CITY_NAME';
const SET_FIELD = 'city/SET_FIELD';
const SET_TRANSLATION_FIELD = 'city/SET_TRANSLATION_FIELD';
const INIT_TRANSLATIONS = 'city/INIT_TRANSLATIONS';

const CREATE_CITY = createAsyncConst('CREATE_CITY');
const UPDATE_CITY = createAsyncConst('UPDATE_CITY');
const EDIT_CITY = createAsyncConst('GET_CITY');
const GET_CITIES = createAsyncConst('GET_CITIES');
const CITIES = createAsyncConst('CITIES');
const DESTROY_CITY = createAsyncConst('DESTROY_CITY');

const CRUD_ENDPOINT = 'city';

const MODEL = {
    translations: []
};

const TRANSLATION_MODEL = {
    title: ''
};

const initialState = {
    entities: {},
    result: [],
    cities: [],
    indexErrors: [],
    manageErrors: [],
    city: MODEL,
    languageId: 1,
    indexLoading: false,
    indexSuccess: false,
    indexFailed: false,
    manageLoading: false,
    manageSuccess: false,
    manageFailed: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_CITIES.PENDING:
            return {...state, ...action.asyncStatus};
        case GET_CITIES.SUCCESS:
            return {
                ...state,
                indexLoading: false,
                //...normalize(action.data.data, schema.citySchema)
                cities: action.data.data
            };
        case GET_CITIES.FAILED:
            return {...state, ...action.asyncStatus};

        case EDIT_CITY.PENDING:
            return {...state, ...action.asyncStatus};
        case EDIT_CITY.SUCCESS:
            return {...state, manageLoading: false, city: action.data.data,};
        case EDIT_CITY.FAILED:
            return {...state, ...action.asyncStatus};

        case CREATE_CITY.PENDING:
            return {...state, ...action.asyncStatus, manageErrors: []};
        case CREATE_CITY.SUCCESS:
            return {...state, ...action.asyncStatus};
        case CREATE_CITY.FAILED:
            return {...state, ...action.asyncStatus, manageErrors: action.validationErrors};

        case UPDATE_CITY.PENDING:
            return {...state, ...action.asyncStatus};
        case UPDATE_CITY.SUCCESS:
            return {...state, ...action.asyncStatus};
        case UPDATE_CITY.FAILED:
            return {...state, ...action.asyncStatus};

        case DESTROY_CITY.PENDING:
            return {...state, ...action.asyncStatus};
        case DESTROY_CITY.SUCCESS:
            return {...state, ...action.asyncStatus};
        case DESTROY_CITY.FAILED:
            return {...state, ...action.asyncStatus};

        case SET_CITY_NAME:
            return {...state, city: {...state.city, [action.name]: action.value}};

        case SET_FIELD:
            return {...state, [action.name]: action.value};

        case SET_TRANSLATION_FIELD:
            return {
                ...state, city: {
                    ...state.city,
                    translations: updateTranslationInArray(state.city.translations, action.payload)
                }
            };

        case INIT_TRANSLATIONS:
            const city = {...state.city, translations: action.translations};
            const normalized = normalize(city, schema.city);
            console.log(normalized);
            return {...state, city: {...state.city, translations: action.translations}};

        case RESET:
            return {...state, ...initialState};

        default:
            return state;
    }
}

export const setCityField = (value, name) => ({
    type: SET_CITY_NAME,
    name, value
});

export const setField = (value, name) => ({
    type: SET_FIELD,
    name, value
});

export const getCities = () => ({
    type: API_GET,
    payload: {
        url: `/${CRUD_ENDPOINT}`,
        params: {
            languageId: 1
        }
    },
    next: GET_CITIES,
    module: 'index',
});

export const storeCity = (city) => ({
    type: API_POST,
    payload: {
        url: `/${CRUD_ENDPOINT}`,
        data: city
    },
    next: CREATE_CITY,
    module: 'manage'
});

export const editCity = (id) => ({
    type: API_GET,
    payload: {
        url: `/${CRUD_ENDPOINT}/${id}`,
    },
    next: EDIT_CITY,
    module: 'manage'
});

export const updateCity = (city) => ({
    type: API_UPDATE,
    payload: {
        url: `/${CRUD_ENDPOINT}`,
        data: city,
    },
    next: UPDATE_CITY,
    module: 'manage'
});

export const destroyCity = (id) => ({
    type: API_DELETE,
    payload: {
        url: `/${CRUD_ENDPOINT}/${id}`,
    },
    next: DESTROY_CITY,
    module: 'manage',
    onSuccess: onDeleteSuccess
});

export const reset = () => ({
    type: RESET
});

const onDeleteSuccess = (data, dispatch) => {
    dispatch(goBack());
};

export const setTranslationField = (value, field, languageId) => {
    return {
        type: SET_TRANSLATION_FIELD,
        payload: {
            value,
            languageId,
            field
        }
    }
};

export const initTranslations = (languages) => {
    return (dispatch, getState) => {
        const translations = getState().language.languages.map(lang => {
            return {
                language: lang,
                ...TRANSLATION_MODEL
            }
        });
        dispatch({
            type: INIT_TRANSLATIONS,
            translations: translations
        })
    }
};

function updateTranslationInArray(array, payload) {
    const {languageId, value, field} = payload;
    return array.map(item => {
        if (item.language.id !== languageId) {
            return item;
        }

        return {
            ...item,
            [field]: value
        };
    });
}