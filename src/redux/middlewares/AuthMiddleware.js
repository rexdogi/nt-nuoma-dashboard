import {AUTH_REGISTER, AUTH_LOGIN} from "redux/constants";
import * as http from "services/http";

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
        case AUTH_REGISTER:
            const {url, data = {}, headers = {}} = action.payload;
            dispatch({type: action.next.PENDING, asyncStatus: pending(action.module)});
            http[action.type](url, data, headers)
                .then(
                    (data) => {
                        dispatch({type: action.next.SUCCESS, data, asyncStatus: success(action.module)})
                    },
                    (error) => {
                        dispatch({type: action.next.FAILED, error, asyncStatus: failed(action.module)})
                    }
                );
            break;
    }

    next(action);
};

export default apiMiddleware;