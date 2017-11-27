import React from 'react';
import {Route, Switch} from "react-router-dom";
import TopBar from 'components/TopBar/index';
import MyDrawer from 'components/MyDrawer/index';
import Settings from 'containers/Settings/index';
import {withStyles, withWidth} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {logout} from "redux/modules/auth";
import {push} from 'react-router-redux';
import Home from "containers/Home/index";
import Cities from 'containers/Cities/index';

class BaseLayout extends React.Component {

    constructor(props) {
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    state = {
        drawerOpen: true
    };

    toggleDrawer() {
        this.setState({drawerOpen: !this.state.drawerOpen})
    }

    render() {
        const {classes} = this.props;

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
                    <div className={classes.content}>
                        <Route path='/dashboard/home' component={Home}/>
                        <Switch>
                            <Route path='/dashboard/cities' component={Cities}/>
                            <Route path='/dashboard/settings' component={Settings}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}


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
        overflow: 'hidden',
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 24,
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
        loggedIn: state.auth.loggedIn
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logout, push}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'BaseLayout'
    }),
    withWidth(),
    connect(mapStateToProps, mapDispatchToProps)
)(BaseLayout)
