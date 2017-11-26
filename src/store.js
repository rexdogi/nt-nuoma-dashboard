import {applyMiddleware, createStore} from "redux";
import rootReducer from 'redux/index';
import thunk from 'redux-thunk';
import {routerMiddleware} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
const router = routerMiddleware(history);

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, router)
);