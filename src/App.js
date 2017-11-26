import {
    Route, Switch, Redirect
} from 'react-router';
import * as React from "react";
import BaseLayout from "./containers/BaseLayout/index";
import {Provider} from 'react-redux'
import Login from "containers/Login/index";
import Register from "containers/Register/index";
import theme from './theme';
import {MuiThemeProvider} from "material-ui";
import {ConnectedRouter} from 'react-router-redux'
import {applyMiddleware, createStore} from "redux";
import rootReducer from 'redux/index';
import thunk from 'redux-thunk';
import {routerMiddleware} from "react-router-redux";
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
const router = routerMiddleware(history);

const store =  createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, router)
);

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        true === true ? (
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
