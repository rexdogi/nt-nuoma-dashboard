import {createAsyncConst} from "services/redux";
import {API_POST, API_GET} from "redux/constants";

const CRUD_ENDPOINT = 'language';

const GET_LANGUAGES = createAsyncConst('GET_LANGUAGES');

const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';

const initialState = {
    language: 'lt',
    languages: [],
    selectedLanguage: null,
    indexPending: false,
    indexSuccess: false,
    indexFailed: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_LANGUAGE:
            return {...state, language: action.language};
        case GET_LANGUAGES.PENDING:
            return {...state, ...action.asyncStatus};
        case GET_LANGUAGES.SUCCESS:
            return {...state, indexLoading: false, languages: action.data.data};
        case GET_LANGUAGES.FAILED:
            return {...state, ...action.asyncStatus};
        default:
            return state;
    }
};

export const switchLanguage = (language) => ({
    type: SWITCH_LANGUAGE,
    language: language
});

export const getLanguages = (cb) => ({
    type: API_GET,
    payload: {
        url: `/${CRUD_ENDPOINT}`,
    },
    next: GET_LANGUAGES,
    module: 'index',
    cb
});

export default reducer;