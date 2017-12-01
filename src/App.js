import {
    Route, Switch, Redirect
} from 'react-router';
import * as React from "react";
import {Provider} from 'react-redux'
import {Login, Register, BaseLayout} from "containers";
import theme from './theme';
import {MuiThemeProvider} from "material-ui";
import {ConnectedRouter} from 'react-router-redux'
import {applyMiddleware, createStore} from "redux";
import rootReducer from 'redux/index';
import thunk from 'redux-thunk';
import {routerMiddleware} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'
import {getAuthData} from "services/auth";
import {SET_USER_OBJECT} from "redux/modules/auth";
import AsyncMiddleware from 'redux/middlewares/AsyncMiddleware';

const history = createHistory();
const router = routerMiddleware(history);

const store =  createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, router, AsyncMiddleware)
);

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        store.getState().auth.loggedIn === true ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

class App extends React.Component {

    render() {
        const tokenData = getAuthData();;
        if(tokenData.status === true) {
            store.dispatch({type: SET_USER_OBJECT, payload: tokenData})
        }
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <PrivateRoute path="/dashboard" component={BaseLayout}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Redirect from='/' to="/dashboard"/>
                        </Switch>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
