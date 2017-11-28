import {API_GET, API_POST, API_UPDATE, API_DELETE} from "redux/constants";
import {get, post, put, destroy} from "services/http";

const apiMiddleware = ({dispatch, getState}) => next => action => {

    switch (action.type) {
        case API_GET:
            dispatch({type: action.next.PENDING});

            get(action.url)
                .then(
                    (data) => dispatch({type: action.next.SUCCESS, data}),
                    (error) => dispatch({type: action.next.FAILED, error})
                );
            break;

        case API_POST:
            dispatch({type: action.next.PENDING});

            post(action.url, action.data)
                .then(
                    (data) => dispatch({type: action.next.SUCCESS, data}),
                    (error) => dispatch({type: action.next.FAILED, error})
                );
            break;

        case API_UPDATE:
            dispatch({type: action.next.PENDING});

            put(action.url, action.data)
                .then(
                    (data) => dispatch({type: action.next.SUCCESS, data}),
                    (error) => dispatch({type: action.next.FAILED, error})
                );
            break;

        case API_DELETE:
            dispatch({type: action.next.PENDING});

            destroy(action.url)
                .then(
                    (data) => dispatch({type: action.next.SUCCESS, data}),
                    (error) => dispatch({type: action.next.FAILED, error})
                );
            break;
        default:
            break;
    }

    next(action);
};

export default apiMiddleware;