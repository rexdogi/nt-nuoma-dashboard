import {API_GET, API_POST, API_UPDATE, API_DELETE} from "redux/constants";
import * as http from "services/http";

const apiMiddleware = ({dispatch, getState}) => next => action => {

    const promise = getPromise(action);
    if(promise !== null) {
        processPromise(promise, action, dispatch);
    }

    next(action);
};

const processPromise = (promise, action, dispatch) => {
    promise
        .then(
            (data) => {
                dispatch({type: action.default.SUCCESS});
                dispatch({type: action.next.SUCCESS, data})
            },
            (error) => {
                dispatch({type: action.default.FAILED});
                dispatch({type: action.next.FAILED, error})
            }
        )
};

const getPromise = (action) => {

    switch (action.type) {
        case API_GET:
            return http['get'](action.url);
        case API_POST:
            return http['post'](action.url, action.data);
        case API_UPDATE:
            return http['put'](action.url, action.data);
        case API_DELETE:
            return http['destroy'](action.url);
        default:
            return null;
    }
};

export default apiMiddleware;