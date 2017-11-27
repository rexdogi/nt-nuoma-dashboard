import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import classNames from 'classnames';

const TopBar = (props) => {

    const handleAuthButton = () => {
        if(props.loggedIn) {
            props.logout();
            props.push('/')
        } else {
            props.push('/login');
        }
    };

    const {classes, loggedIn, drawerOpen, toggleDrawer} = props;
    return (
        <AppBar className={classNames(classes.appBar, drawerOpen && classes.appBarShift)}>
            <Toolbar disableGutters={!drawerOpen}>
                <IconButton
                    color="contrast"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    className={classNames(classes.menuButton, drawerOpen && classes.hide)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography type="title" color="inherit" className={classes.flex}>
                    Dashboard
                </Typography>
                <Button onClick={handleAuthButton} color="contrast">
                    {loggedIn ? 'LOGOUT' : 'LOGIN'}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },

    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
});

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired
};

export default withStyles(styles)(TopBar);