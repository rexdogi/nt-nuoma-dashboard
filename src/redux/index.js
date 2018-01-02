import {combineReducers} from "redux";
import {Auth, City, User, Property, Language} from 'redux/modules';
import {routerReducer} from "react-router-redux";

export default combineReducers({
    auth: Auth,
    city: City,
    user: User,
    property: Property,
    language: Language,
    routing: routerReducer
})