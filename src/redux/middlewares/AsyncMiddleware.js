import {API_GET, API_POST, API_UPDATE, API_DELETE} from "redux/constants";
import axios from 'axios';

const defaultHeaders = () => ({
    'Authorization': localStorage.getItem('id_token'),
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    crossDomain: true
});

const REMOTE_ENDPOINT = 'http://108.59.80.189:8080';
const LOCAL_ENDPOINT = 'http://localhost:8080';

const SELECTED = LOCAL_ENDPOINT;

const pending = (prefix) => ({
    [`${prefix}Success`]: false,
    [`${prefix}Loading`]: true,
    [`${prefix}Failed`]: false
});

const success = (prefix) => ({
    [`${prefix}Success`]: true,
    [`${prefix}Loading`]: false,
});

const failed = (prefix) => ({
    [`${prefix}Loading`]: false,
    [`${prefix}Failed`]: true
});

const apiMiddleware = ({dispatch, getState}) => next => action => {

    switch (action.type) {
        case API_GET:
        case API_POST:
        case API_UPDATE:
        case API_DELETE:
            const {
                onSuccess = null,
                onError = null,
                cb = () => {}
            } = action;

            const {
                url,
                data = {},
                headers = {},
                config = {},
                params = {},
            } = action.payload;

            dispatch({
                type: action.next.PENDING,
                asyncStatus: pending(action.module)
            });

            return axios({
                method: action.type,
                url: SELECTED + url,
                data: data,
                headers: {...defaultHeaders(), ...headers},
                params: params,
                ...config
            }).then(
                (resData) => {
                    dispatch({
                        type: action.next.SUCCESS,
                        asyncStatus: success(action.module),
                        data: resData
                    });
                    if (onSuccess) {
                        onSuccess(resData, dispatch);
                    }
                    cb()
                },
                (resError) => {
                    dispatch({
                        type: action.next.FAILED,
                        asyncStatus: failed(action.module),
                        validationErrors: getValidationsErrors(resError),
                        error: resError
                    });
                    if (onError) {
                        onError(resError, dispatch);
                    }
                    cb()
                }
            );
    }

    next(action);
};

const getValidationsErrors = (error) => {
    if (error.response && error.response.data.errors) {
        return error.response.data.errors;
    }
    return [];
};

export default apiMiddleware;