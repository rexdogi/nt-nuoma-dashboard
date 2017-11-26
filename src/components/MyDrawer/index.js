import React from 'react';
import {
    Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, withStyles,
    withTheme
} from "material-ui";
import {compose} from "redux";
import classNames from 'classnames';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import InboxIcon from 'material-ui-icons/Inbox';

class MyDrawer extends React.Component {

    render() {
        const {classes, theme, drawerOpen, toggleDrawer} = this.props;
        return (
            <Drawer
                type="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
                }}
                open={drawerOpen}
            >
                <div className={classes.drawerInner}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={toggleDrawer}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List className={classes.list}>
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="WUT" />
                        </ListItem>
                    </List>
                    <Divider />
                </div>
            </Drawer>
        )
    }
}

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

export default compose(
    withStyles(styles, {name: 'MyDrawer'}),
    withTheme()
)(MyDrawer)