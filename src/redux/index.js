import {combineReducers} from "redux";
import {Auth, City} from 'redux/modules'
import {routerReducer} from "react-router-redux";

export default combineReducers({
    auth: Auth,
    city: City,
    routing: routerReducer
})