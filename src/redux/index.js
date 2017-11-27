import {combineReducers} from "redux";
import {Auth} from 'redux/modules'
import {routerReducer} from "react-router-redux";

export default combineReducers({
    auth: Auth,
    routing: routerReducer
})