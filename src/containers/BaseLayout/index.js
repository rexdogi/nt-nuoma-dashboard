import React from 'react';
import {Route, Switch} from "react-router-dom";
import TopBar from 'components/TopBar/index';
import {MyDrawer} from 'components';
import {
    Settings,
    Cities,
    Home,
    CitiesManage,
    Users,
    UsersManage,
    Properties,
    PropertiesManage
} from 'containers';
import {withStyles, withWidth} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {logout} from "redux/modules/auth/index";
import {push} from 'react-router-redux';
import {getLanguages} from "redux/modules/language";

class BaseLayout extends React.Component {

    constructor(props) {
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.props.getLanguages();
    }

    state = {
        drawerOpen: true
    };

    toggleDrawer() {
        this.setState({drawerOpen: !this.state.drawerOpen})
    }

    render() {
        const {classes, match, languages} = this.props;

        const contentPadding = () => ({
            paddingLeft: this.state.drawerOpen ? drawerWidth : drawerClosed,
            transition: '0.3s'
        });

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <TopBar
                        toggleDrawer={this.toggleDrawer}
                        drawerOpen={this.state.drawerOpen}
                        loggedIn={this.props.loggedIn}
                        logout={this.props.logout}
                        push={this.props.push}
                    />
                    <MyDrawer toggleDrawer={this.toggleDrawer} drawerOpen={this.state.drawerOpen}/>
                    <div style={contentPadding()} className={classes.content}>
                        {languages.length !== 0 &&
                        <Switch>
                            < Route exact path={`${match.url}/`} component={Home}/>

                            <Route exact path={`${match.url}/cities`} component={Cities}/>
                            <Route exact path={`${match.url}/cities/create`} component={CitiesManage}/>
                            <Route exact path={`${match.url}/cities/:id`} component={CitiesManage}/>

                            <Route exact path={`${match.url}/users`} component={Users}/>
                            <Route exact path={`${match.url}/users/create`} component={UsersManage}/>
                            <Route exact path={`${match.url}/users/:id`} component={UsersManage}/>

                            <Route exact path={`${match.url}/properties`} component={Properties}/>
                            <Route exact path={`${match.url}/properties/create`} component={PropertiesManage}/>
                            <Route exact path={`${match.url}/properties/:id`} component={PropertiesManage}/>

                            <Route path={`${match.url}/settings`} component={Settings}/>
                        </Switch>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const drawerWidth = 240;
const drawerClosed = 60;

const styles = theme => ({
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    }
});

function mapStateToProps(state) {
    return {
        loggedIn: state.auth.loggedIn,
        languages: state.language.languages
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logout, getLanguages, push}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'BaseLayout'
    }),
    withWidth(),
    connect(mapStateToProps, mapDispatchToProps)
)(BaseLayout)
